import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  const buf = fs.readFileSync(
    path.join(process.cwd(), 'public/river-confluence/confluence-01.png'),
  )
  const src = `data:image/png;base64,${buf.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          display: 'flex',
          background: '#7A2D3E',
          padding: 18,
        }}
      >
        <div
          style={{
            flex: 1,
            background: '#F5EFE3',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* River bleeding off bottom edge */}
          <img
            src={src}
            style={{
              position: 'absolute',
              width: 560,
              bottom: -55,
              left: -15,
            }}
          />
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
