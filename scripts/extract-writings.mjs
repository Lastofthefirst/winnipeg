#!/usr/bin/env node
// Extract exact passage + source from existing static writing pages → writings.json
// Deterministic: reads actual file content, no hand-typing.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const writingsDir = path.join(__dirname, '../src/app/writings')

const entries = []

for (const slug of fs.readdirSync(writingsDir).sort()) {
  const pagePath = path.join(writingsDir, slug, 'page.tsx')
  if (!fs.existsSync(pagePath)) continue

  const src = fs.readFileSync(pagePath, 'utf-8')

  // Extract passage: text between <p className=...> and </p> inside <blockquote>
  const pMatch = src.match(/<p className="[^"]*">\s*\n((?:.*?\n)*?)\s*<\/p>/)
  if (!pMatch) { console.error(`No passage in ${slug}`); process.exit(1) }
  let passage = pMatch[1]
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\n\s*/g, ' ')
    .trim()

  // Extract source from <figcaption>
  const figMatch = src.match(/<figcaption[^>]*>\s*([\s\S]*?)\s*<\/figcaption>/)
  if (!figMatch) { console.error(`No source in ${slug}`); process.exit(1) }
  const source = figMatch[1]
    .replace(/&apos;/g, "'")
    .replace(/&thinsp;/g, '\u2009')
    .replace(/\s+/g, ' ')
    .trim()

  // Extract image filename from src="/writings-nature/..."
  const imgMatch = src.match(/src="\/writings-nature\/([^"]+)"/)
  if (!imgMatch) { console.error(`No image in ${slug}`); process.exit(1) }
  const image = imgMatch[1]

  entries.push({ slug, passage, source, language: 'English', image })
}

console.log(JSON.stringify(entries, null, 2))
