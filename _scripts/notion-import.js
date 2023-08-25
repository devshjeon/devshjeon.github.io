const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")
const moment = require("moment")
const path = require("path")
const fs = require("fs")
const https = require("https")
const AWS = require("aws-sdk")
// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
})

const s3 = new AWS.S3()

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion })
const regexPattern = "https:\/\/s3.us-west-2.amazonaws.com.+x-id=GetObject"

function findImageUrl(str) {
  const regex = new RegExp(regexPattern, "g")
  const matches = str.match(regex)
  return matches || []
}

async function deleteAllFiles(folderPath) {
  const files = await fs.promises.readdir(folderPath)

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(folderPath, files[i])
    try {
      await fs.promises.unlink(filePath)
    } catch (err) {
      console.error("Error deleting file:", filePath, err)
    }
  }

  await fs.promises.rm("_images", { recursive: true })
}

function downloadImage(url, fileName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName)
    https.get(url, (response) => {
      response.pipe(file)
      file.on("finish", () => {
        file.close(resolve)
      })
    }).on("error", (err) => {
      fs.unlink(fileName, () => {
        reject(err)
      })
    })
  })
}

async function downloadImages(path, imageUrls) {
  let number = 1
  const s3Urls = []
  for (let url of imageUrls) {
    const fileName = `${path}/${number}.png`
    await downloadImage(url, fileName)

    const fileContent = await fs.promises.readFile(fileName)
    const params = {
      Bucket: "devshjeon-blog-images",
      Key: fileName,
      Body: fileContent,
    }

    const uploadResult = await s3.upload(params).promise()
    s3Urls.push(uploadResult.Location)
    number++
  }

  await deleteAllFiles(path)

  return s3Urls
}

function replaceUrl(body, imageUrls, s3Urls) {
  if (s3Urls.length === imageUrls.length) {
    for (let i = 0; i < s3Urls.length; i++) {
      body = body.replace(imageUrls[i], s3Urls[i])
    }
  }
  return body
}

(async () => {
  // ensure directory exists
  const root = `docs`
  const imageRoot = "_images"

  const databaseId = process.env.DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "and": [
        {
          property: "공개",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "배포",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  })
  for (const r of response.results) {
    const id = r.id

    // 최상위폴더
    let upUpFolder = ""
    let pUpUpFolder = r.properties?.["최상위폴더"]?.["rich_text"]
    if (pUpUpFolder) {
      upUpFolder = pUpUpFolder[0]?.["plain_text"]
    }

    // 상위폴더
    let upFolder = ""
    let pUpFolder = r.properties?.["상위폴더"]?.["rich_text"]
    if (pUpFolder) {
      upFolder = pUpFolder[0]?.["plain_text"]
    }

    // 순번
    let navOrder = r.properties?.["순번"]?.["number"] || ""

    // 제목
    let title = id
    let pTitle = r.properties?.["제목"]?.["title"]
    if (pTitle?.length > 0) {
      title = pTitle[0]?.["plain_text"]
    }

    // 메인
    let hasChild = r.properties?.["메인"]?.["checkbox"] || false

    // 작성일
    let date = moment(r.created_time).format("YYYY-MM-DD HH:mm")
    let pDate = r.properties?.["작성일"]?.["last_edited_time"]?.["start"]
    if (pDate) {
      date = moment(pDate).format("YYYY-MM-DD HH:mm")
    }

    let header = `---
layout: default
title: ${title}
has_children: ${hasChild}
last_modified_date: ${date}`

    if (navOrder) {
      header += `
nav_order: ${navOrder}`
    }

    if (hasChild) {
      if (upFolder) {
        header += `
parent: ${upUpFolder}`
      }
    } else {
      header += `
grand_parent: ${upUpFolder}`
      if (upFolder) {
        header += `
parent: ${upFolder}`
      }
    }
    header += `
---`

    const folderPath = upFolder ? `${root}/${upUpFolder}/${upFolder}` : `${root}/${upUpFolder}`
    const imagePath = upFolder ? `${imageRoot}/${upUpFolder}/${upFolder}/${title}` : `${imageRoot}/${upUpFolder}/${title}`
    fs.mkdirSync(folderPath, { recursive: true })

    const mdBlocks = await n2m.pageToMarkdown(id)
    let body = n2m.toMarkdownString(mdBlocks)["parent"]

    // download image
    const imageUrls = findImageUrl(body)
    let s3Urls = []
    if (imageUrls.length > 0) {
      fs.mkdirSync(imagePath, { recursive: true })
      s3Urls = await downloadImages(imagePath, imageUrls)
      body = replaceUrl(body, imageUrls, s3Urls)
    }

    //writing to file
    const fTitle = navOrder ? `${navOrder}.${title}.md` : `${title}.md`
    fs.writeFile(path.join(folderPath, fTitle), header + body, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
})()