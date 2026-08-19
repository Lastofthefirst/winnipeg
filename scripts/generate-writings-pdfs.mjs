/**
 * Generates one PDF per writings entry ("prayer card"), matching the
 * /writings/[slug] page design: parchment ground, gold hairlines,
 * centered image, centered serif passage, small-caps source. Also writes
 * all.pdf, every card in one file.
 *
 * Run via the prebuild/predev hooks; output lands in public/writings-pdf/
 * and is served at /writings-pdf/[slug].pdf.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// ─── Palette (src/styles/tailwind.css) ──────────────────────────────────────

const PARCHMENT = '#F5EFE3'
const BURGUNDY_900 = '#2E0F19'
const BURGUNDY_500 = '#9A3F50'
const GOLD_500 = '#B08A50'
const GOLD_400 = '#C6A26D'

// ─── Layout (1px = 0.75pt) ──────────────────────────────────────────────────

const PAGE = { width: 595.28, height: 841.89 } // A4
const MARGIN = 76
const COLUMN_WIDTH = 400
const COLUMN_X = (PAGE.width - COLUMN_WIDTH) / 2
const IMAGE_BOX = 288 // sm:max-w-sm (384px)
// Image height caps tried largest-first; 0 means no image (long passages)
const IMAGE_CAPS = [300, 220, 170, 120, 0]
const PASSAGE_SIZES = [27, 22, 18, 16]
const HAIRLINE_WIDTH = 60 // w-20
const DIVIDER_WIDTH = 48 // w-16
const THICKNESS = 1
const SOURCE_SIZE = 12

const ETHIOPIC = /[\u1200-\u137F]/

// Split into maximal runs of one script — the Ethiopic font lacks Latin
// punctuation, so mixed passages need per-run fonts.
function scriptRuns(text) {
  const runs = []
  let current = ''
  let currentEthiopic = null
  for (const ch of text) {
    const ethiopic = ETHIOPIC.test(ch)
    if (currentEthiopic === null) currentEthiopic = ethiopic
    if (ethiopic !== currentEthiopic) {
      runs.push({ text: current, ethiopic: currentEthiopic })
      current = ''
      currentEthiopic = ethiopic
    }
    current += ch
  }
  if (current) runs.push({ text: current, ethiopic: currentEthiopic })
  return runs
}

// pdfkit cannot mix fonts within a centered, wrapping paragraph
// (continued segments each re-center their own chunk), so the passage is
// laid out manually: greedy word wrap, each line centered, each word drawn
// with its own script's font.
function layoutPassage(doc, passage, size) {
  const tokens = []
  for (const run of scriptRuns(passage)) {
    for (const part of run.text.split(/(\s+)/)) {
      if (part) {
        tokens.push({
          text: part,
          font: run.ethiopic ? 'Ethiopic' : 'Serif',
        })
      }
    }
  }
  for (const token of tokens) {
    token.width = doc.font(token.font).fontSize(size).widthOfString(token.text)
  }

  const lines = []
  let line = []
  let lineWidth = 0
  for (const token of tokens) {
    const space = /^\s+$/.test(token.text)
    if (line.length > 0 && lineWidth + token.width > COLUMN_WIDTH) {
      lines.push({ tokens: line, width: lineWidth })
      line = space ? [] : [token]
      lineWidth = space ? 0 : token.width
    } else {
      line.push(token)
      lineWidth += token.width
    }
  }
  lines.push({ tokens: line, width: lineWidth })

  for (const lineInfo of lines) {
    while (
      lineInfo.tokens.length > 0 &&
      /^\s+$/.test(lineInfo.tokens[lineInfo.tokens.length - 1].text)
    ) {
      lineInfo.tokens.pop()
    }
    lineInfo.width = lineInfo.tokens.reduce((sum, token) => sum + token.width, 0)
  }
  return lines
}

function pngDimensions(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) {
    throw new Error('Image is not a PNG')
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}

function createDoc(onPage) {
  const doc = new PDFDocument({ size: 'A4' })
  doc.registerFont('Serif', resolve(root, 'src/fonts/NotoSerif-Regular.ttf'))
  doc.registerFont('Ethiopic', resolve(root, 'src/fonts/NotoSerifEthiopic-Regular.ttf'))
  doc.on('pageAdded', () => onPage(doc))
  return doc
}

// Largest passage font that fits on one page, with the largest image that
// still fits. Long passages end up with no image rather than a second page.
function layoutEntry(doc, entry, imgW, imgH) {
  const sourceHeight = SOURCE_SIZE + 4
  const available = PAGE.height - 2 * MARGIN

  for (const size of PASSAGE_SIZES) {
    const lineGap = Math.round(size * 0.5)
    doc.font('Serif').fontSize(size)
    const lineHeight = doc.currentLineHeight(true)
    const passageLines = layoutPassage(doc, entry.passage, size)
    const passageHeight = passageLines.length * (lineHeight + lineGap)
    for (const imageCap of IMAGE_CAPS) {
      const capScale = Math.min(IMAGE_BOX / imgW, imageCap / imgH, 1)
      const capImageHeight = imgH * capScale
      const blockHeight =
        THICKNESS + 44 + passageHeight + 36 +
        THICKNESS + 16 + sourceHeight + 36 + THICKNESS +
        (imageCap > 0 ? capImageHeight + 44 : 0)
      if (blockHeight <= available) {
        return { size, lineGap, lineHeight, passageLines, blockHeight, capScale, capImageHeight }
      }
    }
  }
  throw new Error(`No single-page layout for writings entry ${entry.slug}`)
}

function drawEntry(doc, entry, layout, imageBuffer, imgW) {
  const { size, lineGap, lineHeight, passageLines, blockHeight, capScale, capImageHeight } = layout
  const centerX = PAGE.width / 2

  let y = (PAGE.height - blockHeight) / 2

  doc.rect(centerX - HAIRLINE_WIDTH / 2, y, HAIRLINE_WIDTH, THICKNESS).fill(GOLD_500)
  y += THICKNESS + 44
  if (capImageHeight > 0) {
    doc.image(imageBuffer, centerX - (imgW * capScale) / 2, y, {
      width: imgW * capScale,
      height: capImageHeight,
    })
    y += capImageHeight + 44
  }
  for (const lineInfo of passageLines) {
    let x = centerX - lineInfo.width / 2
    for (const token of lineInfo.tokens) {
      doc.font(token.font).fontSize(size).fillColor(BURGUNDY_900)
      doc.text(token.text, x, y, { lineBreak: false })
      x += token.width
    }
    y += lineHeight + lineGap
  }
  y -= lineGap

  y += 36
  doc.rect(centerX - DIVIDER_WIDTH / 2, y, DIVIDER_WIDTH, THICKNESS).fill(GOLD_400)
  y += THICKNESS + 16
  doc.font('Serif').fontSize(SOURCE_SIZE).fillColor(BURGUNDY_500)
  doc.text(entry.source.toUpperCase(), COLUMN_X, y, {
    width: COLUMN_WIDTH,
    align: 'center',
  })
  y = doc.y + 36
  doc.rect(centerX - HAIRLINE_WIDTH / 2, y, HAIRLINE_WIDTH, THICKNESS).fill(GOLD_500)
}

function toBuffer(doc) {
  return new Promise((resolvePdf, reject) => {
    const chunks = []
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('error', reject)
    doc.on('end', () => resolvePdf(Buffer.concat(chunks)))
    doc.end()
  })
}

function readEntryAssets(entry) {
  const imageBuffer = readFileSync(resolve(root, 'public/writings-nature', entry.image))
  return { imageBuffer, ...pngDimensions(imageBuffer) }
}

const writings = JSON.parse(
  readFileSync(resolve(root, 'content/cms/writings.json'), 'utf8'),
)

const outDir = resolve(root, 'public/writings-pdf')
mkdirSync(outDir, { recursive: true })

// Pre-measure every entry so all.pdf uses the identical layouts.
const assets = writings.map((entry) => ({ entry, ...readEntryAssets(entry) }))
const measureDoc = createDoc(() => {})
const layouts = assets.map(({ entry, width, height }) => layoutEntry(measureDoc, entry, width, height))

for (let i = 0; i < writings.length; i++) {
  const { entry, imageBuffer, width } = assets[i]
  const doc = createDoc((d) => d.rect(0, 0, PAGE.width, PAGE.height).fill(PARCHMENT))
  // the first page's pageAdded fires during construction, before the listener
  doc.rect(0, 0, PAGE.width, PAGE.height).fill(PARCHMENT)
  drawEntry(doc, entry, layouts[i], imageBuffer, width)
  const pdf = await toBuffer(doc)
  writeFileSync(resolve(outDir, `${entry.slug}.pdf`), pdf)
  console.log(`  writings-pdf/${entry.slug}.pdf (${(pdf.length / 1024).toFixed(0)} KB)`)
}

{
  const doc = createDoc((d) => d.rect(0, 0, PAGE.width, PAGE.height).fill(PARCHMENT))
  doc.rect(0, 0, PAGE.width, PAGE.height).fill(PARCHMENT)
  assets.forEach(({ entry, imageBuffer, width }, i) => {
    if (i > 0) doc.addPage()
    drawEntry(doc, entry, layouts[i], imageBuffer, width)
  })
  const pdf = await toBuffer(doc)
  writeFileSync(resolve(outDir, 'all.pdf'), pdf)
  console.log(`  writings-pdf/all.pdf (${(pdf.length / 1024).toFixed(0)} KB)`)
}

console.log(`Generated ${writings.length + 1} PDFs in public/writings-pdf/`)
