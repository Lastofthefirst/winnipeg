#!/usr/bin/env node
// Generate src/admin/writings-images.ts from public/writings-nature/
import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'public/writings-nature')
const files = fs.readdirSync(dir).filter((f) => /\.(png|jpg|webp|gif|svg)$/i.test(f)).sort()
const content = `// Auto-generated — lists available writing card images.\n// Run: node scripts/gen-writings-images.mjs\nexport const WRITING_IMAGES = ${JSON.stringify(files, null, 2)} as const;\n`
fs.writeFileSync(path.join(process.cwd(), 'src/admin/writings-images.ts'), content)
console.log(`Wrote ${files.length} images`)
