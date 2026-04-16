'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { type ImageProps, type StaticImageData } from 'next/image'
import { OptimizedImage } from '@/components/OptimizedImage'

const STYLES = ['original', 'photography', 'watercolor', 'inkwash', 'woodblock', 'risograph', 'cyanotype', 'charcoal', 'scratchboard'] as const
type ArtStyle = (typeof STYLES)[number]

const STYLE_LABELS: Record<ArtStyle, string> = {
  original: 'Original Photos',
  photography: 'Photography',
  watercolor: 'Watercolor',
  inkwash: 'Ink Wash',
  woodblock: 'Woodblock Print',
  risograph: 'Risograph',
  cyanotype: 'Cyanotype',
  charcoal: 'Charcoal & Conté',
  scratchboard: 'Scratchboard',
}

const StyleContext = createContext<{
  style: ArtStyle
  setStyle: (s: ArtStyle) => void
}>({ style: 'original', setStyle: () => {} })

export function useArtStyle() {
  return useContext(StyleContext)
}

export function StyleProvider({ children }: { children: ReactNode }) {
  let [style, setStyle] = useState<ArtStyle>('original')

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
      <FloatingStyleSwitcher />
    </StyleContext.Provider>
  )
}

function FloatingStyleSwitcher() {
  let { style, setStyle } = useArtStyle()
  let [open, setOpen] = useState(false)

  let cycleStyle = useCallback(() => {
    let idx = STYLES.indexOf(style)
    setStyle(STYLES[(idx + 1) % STYLES.length])
  }, [style, setStyle])

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      {open && (
        <div className="mb-2 overflow-hidden rounded-lg border border-burgundy-200 bg-ivory shadow-xl">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStyle(s)
                setOpen(false)
              }}
              className={`block w-full px-5 py-3 text-left text-sm transition ${
                s === style
                  ? 'bg-burgundy-900 font-medium text-ivory'
                  : 'text-burgundy-800 hover:bg-burgundy-50'
              }`}
            >
              {STYLE_LABELS[s]}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        onDoubleClick={cycleStyle}
        className="flex items-center gap-2 rounded-full border border-burgundy-200 bg-ivory px-4 py-2.5 text-sm font-medium text-burgundy-900 shadow-lg transition hover:bg-burgundy-50 hover:shadow-xl"
        title="Click to pick style, double-click to cycle"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M12 2a7 7 0 0 1 0 20" />
          <path d="M2 12h20" />
        </svg>
        {STYLE_LABELS[style]}
      </button>
    </div>
  )
}

type ImageSrc = string | StaticImageData | { default: StaticImageData }

function getImageDimension(
  src: ImageSrc,
  prop: 'width' | 'height',
): number {
  if (typeof src === 'string') return 1024
  if ('default' in src) return src.default[prop]
  return src[prop]
}

/**
 * Drop-in replacement for next/image that swaps sources based on active art style.
 * Pass `styleName` to identify which art-style image to load.
 *
 * Usage:
 *   <StyledImage src={imageDevotional} styleName="devotional-gathering" alt="..." ... />
 */
export function StyledImage({
  styleName,
  src,
  ...props
}: Omit<ImageProps, 'src'> & { styleName: string; src: ImageSrc }) {
  let { style } = useArtStyle()

  if (style === 'original' || !styleName) {
    return <OptimizedImage src={src} {...props} />
  }

  // Use the public art-style image
  return (
    <OptimizedImage
      src={`/art-styles/${style}/${styleName}.png`}
      width={getImageDimension(src, 'width')}
      height={getImageDimension(src, 'height')}
      {...props}
    />
  )
}
