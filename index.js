import { Client } from "@notionhq/client"

// require('dotenv').config()
import dotenv from "dotenv"
dotenv.config({ path: './.env' })

// import axios from 'axios';

import prop from './ENV/20220319/properties.json' assert { type: "json" }
import contentList from './ENV/20220319/content.js'

// const prop = prop;
// const content_data} = content;

// console.log(prop)
// console.log(contentList)

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.LGCNS_DATABASE_ID


async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}


async function createPage() {

  try {
    const response = await notion.pages.create({
      // "cover": {
      //     "type": "external",
      //     "external": {
      //         "url": ""
      //     }
      // },
      // "icon": {
      //     "type": "emoji",
      //     "emoji": ""
      // },
      "parent": {
          "type": "database_id",
          "database_id": databaseId
      },
      "properties": prop,
      "children": contentList
  })

  console.log(response)
  console.log("Success! Page created.")
  } catch (error) {
    console.error(error.body)
  }
}

async function updatePage() {
  try {
    const pageId = process.env.KPI_PAGE_ID;
    const response = await notion.pages.update({
      page_id: pageId,
      properties: prop,
      children: contentList
    })
    console.log(response)
    console.log("Success! Page updated.")
  } catch (error) {
    console.error(error.body)
  }
}


// addItem("Yurts in Big Sur, California")
// createPage()
updatePage()