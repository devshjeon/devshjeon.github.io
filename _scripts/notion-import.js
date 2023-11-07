const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")
const moment = require("moment")
const moment_timezone = require("moment-timezone")
const path = require("path")
const fs = require("fs")
const https = require("https")
const AWS = require("aws-sdk")
const sharp = require("sharp")
const { SitemapStream, streamToPromise } = require("sitemap")
const { Readable } = require("stream")
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
const regexPattern = "https:\/\/.*s3.us-west-2.amazonaws.com.+x-id=GetObject"

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
  const s3Urls = await Promise.all(imageUrls.map(async (url, index) => {
    const ext = url.split(".").pop().split("?")[0] || "png"
    const format = "webp"
    const originalFileName = `${path}/${index + 1}.${ext}`
    const newFileName = `${path}/${index + 1}.${format}`

    await downloadImage(url, originalFileName)
    const fileContent = await fs.promises.readFile(originalFileName)
    const quality = 50

    return sharp(fileContent, { limitInputPixels: false, pages: -1 })
      .toFormat(format, { quality })
      .toBuffer()
      .then(async (outputBuffer) => {
        const params = {
          Bucket: "devshjeon-blog-images",
          CacheControl: "max-age=25920000",
          Key: newFileName,
          Body: outputBuffer,
        }
        const uploadResult = await s3.upload(params).promise()
        return uploadResult.Location
      })
      .catch((err) => {
        console.error("이미지 변환 실패:", err)
      })
  }))

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

function generateSitemap(links) {
  const stream = new SitemapStream({
    hostname: "https://devshjeon.github.io/",
    lastmodDateOnly: true,
  })
  streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
      fs.writeFile("sitemap.xml", data.toString(), (err) => {
        if (err) {
          console.log(err)
        }
      })
    },
  )
}

function escapeCodeBlock(body) {
  const regex = /```([\s\S]*?)```/g
  return body.replace(regex, function(match, htmlBlock) {
    return "{% raw %}\n```" + htmlBlock + "```\n{% endraw %}"
  })
}

function convertLazyImage(body) {
  const regex = /!\[([\s\S]*?)\]\(https:\/\/devshjeon-blog-images([\s\S]*?)\)/g
  return body.replace(regex, function(match) {
    return `{% include lazyload.html image_src="${match.split("(")[1].slice(0, -1)}" %}`
  })
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
      ],
    },
  })

  const links = []

  for (const r of response.results) {
    const id = r.id
    let pk = r.properties?.["ID"]?.["unique_id"]?.["number"]

    // 배포
    let isPublished = r.properties?.["배포"]?.["checkbox"] || false
    let modifiedDate = moment(r.last_edited_time).tz("Asia/Seoul").format("YYYY-MM-DD")

    // 사이트맵
    links.push(
      {
        url: `/${pk}`,
      },
    )

    // 배포인 경우에만 파일 생성
    if (isPublished) {
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
      let publishedDate = moment(r.created_time).tz("Asia/Seoul").format("YYYY-MM-DD")

      let header = `---
layout: default
title: ${title}
has_children: ${hasChild}
published_date: ${publishedDate}
last_modified_date: ${modifiedDate}`
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
permalink: '${pk}'`
      header += `
---`

      const folderPath = upFolder ? `${root}/${upUpFolder}/${upFolder}` : `${root}/${upUpFolder}`
      const imagePath = upFolder ? `${imageRoot}/${upUpFolder}/${upFolder}/${title}` : `${imageRoot}/${upUpFolder}/${title}`
      fs.mkdirSync(folderPath, { recursive: true })

      const mdBlocks = await n2m.pageToMarkdown(id)
      let body = n2m.toMarkdownString(mdBlocks)["parent"]

      // code block escape
      body = escapeCodeBlock(body)

      // download image
      const imageUrls = findImageUrl(body)
      if (imageUrls.length > 0) {
        fs.mkdirSync(imagePath, { recursive: true })
        const s3Urls = await downloadImages(imagePath, imageUrls)
        body = replaceUrl(body, imageUrls, s3Urls)
      }

      body = convertLazyImage(body)

      //writing to file
      const fTitle = `${pk}.md`
      fs.writeFile(path.join(folderPath, fTitle), header + body, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }

  generateSitemap(links)
})()