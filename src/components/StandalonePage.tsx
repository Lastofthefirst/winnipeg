'use client'

import ExportedImage, {
  type ExportedImageProps,
} from 'next-image-export-optimizer'
import type { StaticImageData } from 'next/image'

type ImageSrc = string | StaticImageData | { default: StaticImageData }

function resolveImageSrc(src: ImageSrc): string | StaticImageData {
  if (typeof src === 'string') return src
  if ('default' in src) return src.default
  return src
}

export function StandaloneImage({
  src,
  width = 600,
  height = 600,
  ...props
}: Omit<ExportedImageProps, 'src'> & { src: ImageSrc }) {
  const resolved = resolveImageSrc(src)
  // StaticImageData already carries width/height; skip defaults for imported images
  if (typeof resolved === 'object' && 'width' in resolved) {
    return <ExportedImage src={resolved} {...props} />
  }
  return <ExportedImage src={resolved} width={width} height={height} {...props} />
}

export function StandalonePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment">
      {children}
    </div>
  )
}
