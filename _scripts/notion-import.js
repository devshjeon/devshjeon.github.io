const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")
const moment = require("moment")
const path = require("path")
const fs = require("fs")
// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  // ensure directory exists
  const root = `docs`

  const databaseId = process.env.DATABASE_ID
  // TODO has_more
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "공개",
      checkbox: {
        equals: true,
      },
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
    let date = moment(r.created_time).format("YYYY-MM-DD")
    let pDate = r.properties?.["작성일"]?.["date"]?.["start"]
    if (pDate) {
      date = moment(pDate).format("YYYY-MM-DD")
    }

    let header = `---
layout: default
title: ${title}
has_children: ${hasChild}
date: ${date}`

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
    fs.mkdirSync(folderPath, { recursive: true })

    const mdBlocks = await n2m.pageToMarkdown(id)
    const body = n2m.toMarkdownString(mdBlocks)["parent"]

    //writing to file
    const fTitle = navOrder ? `${navOrder}.${title}.md` : `${title}.md`
    fs.writeFile(path.join(folderPath, fTitle), header + body, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
})()