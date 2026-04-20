import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-static'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  const font = readFileSync(join(process.cwd(), 'src/fonts/NotoSerifDisplay-Black.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: '#F5EFE3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
        }}
      >
        {/* Top gold rule */}
        <div style={{ width: 96, height: 2, background: '#B8973B', marginBottom: 24, display: 'flex' }} />

        {/* The W */}
        <span
          style={{
            fontFamily: 'NotoSerifDisplay',
            fontSize: 340,
            fontWeight: 900,
            color: '#2E0F19',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          W
        </span>

        {/* Bottom gold rule */}
        <div style={{ width: 96, height: 2, background: '#B8973B', marginTop: 24, display: 'flex' }} />
      </div>
    ),
    {
      width: 512,
      height: 512,
      fonts: [
        {
          name: 'NotoSerifDisplay',
          data: font,
          weight: 900,
          style: 'normal',
        },
      ],
    },
  )
}
