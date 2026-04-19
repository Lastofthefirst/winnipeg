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

    const rssImage = attr('media:content', 'url') || attr('enclosure', 'url') || ''

    items.push({
      title: text('title'),
      description: text('description').replace(/<[^>]+>/g, '').slice(0, 300),
      link: text('link'),
      pubDate: text('pubDate'),
      image: rssImage,
    })
  }

  return items
}

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Winnipeg-Bahai-Site/1.0' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return ''
    const html = await res.text()
    const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
    return m ? m[1] : ''
  } catch {
    return ''
  }
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

  // Build image cache from existing news.json so we don't re-fetch known articles
  const imageCache = new Map()
  if (existsSync(OUTPUT)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT, 'utf8'))
      for (const item of existing) {
        if (item.image) imageCache.set(item.link, item.image)
      }
    } catch { /* ignore corrupt file */ }
  }

  // Fetch og:image only for articles not already in cache
  const newLinks = items.filter(i => !imageCache.has(i.link) && !i.image)
  if (newLinks.length > 0) {
    console.log(`Fetching og:image for ${newLinks.length} new article(s)...`)
    for (const item of newLinks) {
      const img = await fetchOgImage(item.link)
      if (img) {
        imageCache.set(item.link, img)
        console.log(`  ✓ ${item.title.slice(0, 50)}`)
      }
      // small delay to be polite
      await new Promise(r => setTimeout(r, 300))
    }
  }

  // Apply cached images
  const result = items.map(item => ({
    ...item,
    image: item.image || imageCache.get(item.link) || '',
  }))

  const next = JSON.stringify(result, null, 2)

  if (existsSync(OUTPUT)) {
    const prev = readFileSync(OUTPUT, 'utf8')
    if (prev === next) {
      console.log('No changes — skipping write')
      process.exit(0)
    }
  }

  writeFileSync(OUTPUT, next)
  console.log(`Written ${result.length} items to ${OUTPUT}`)
  // Exit 1 signals "file was changed" to the GitHub Action
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
