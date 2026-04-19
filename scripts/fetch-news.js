#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../public/news.json')
const RSS_URL = 'https://news.bahai.org/rss.xml'

function parseItems(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]

    const text = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`))
      return m ? m[1].trim() : ''
    }

    const attr = (tag, attribute) => {
      const m = block.match(new RegExp(`<${tag}[^>]*${attribute}="([^"]*)"`, 'i'))
      return m ? m[1] : ''
    }

    const image =
      attr('media:content', 'url') ||
      attr('enclosure', 'url') ||
      ''

    items.push({
      title: text('title'),
      description: text('description').replace(/<[^>]+>/g, '').slice(0, 300),
      link: text('link'),
      pubDate: text('pubDate'),
      image,
    })
  }

  return items
}

async function main() {
  console.log('Fetching', RSS_URL)
  const res = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'Winnipeg-Bahai-Site/1.0' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const xml = await res.text()
  const items = parseItems(xml)
  if (items.length === 0) throw new Error('No items parsed from feed')

  const next = JSON.stringify(items, null, 2)

  if (existsSync(OUTPUT)) {
    const prev = readFileSync(OUTPUT, 'utf8')
    if (prev === next) {
      console.log('No changes — skipping write')
      process.exit(0)
    }
  }

  writeFileSync(OUTPUT, next)
  console.log(`Written ${items.length} items to ${OUTPUT}`)
  // Exit code 1 signals "file was changed" to the GitHub Action
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
