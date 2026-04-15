'use client'

import ExportedImage, {
  type ExportedImageProps,
} from 'next-image-export-optimizer'
import type { StaticImageData } from 'next/image'

// Re-export the props type for consumers
export type { ExportedImageProps as OptimizedImageProps }

// Handle both string and StaticImageData src types
type ImageSrc = string | StaticImageData | { default: StaticImageData }

function resolveImageSrc(src: ImageSrc): string | StaticImageData {
  if (typeof src === 'string') return src
  if ('default' in src) return src.default
  return src
}

export function OptimizedImage({
  src,
  ...props
}: Omit<ExportedImageProps, 'src'> & { src: ImageSrc }) {
  return <ExportedImage src={resolveImageSrc(src)} {...props} />
}
