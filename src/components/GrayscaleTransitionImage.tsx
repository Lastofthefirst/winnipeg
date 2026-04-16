'use client'

import { useRef } from 'react'
import { type StaticImageData } from 'next/image'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import { OptimizedImage } from '@/components/OptimizedImage'

const MotionOptimizedImage = motion(OptimizedImage)

type ImageSrc = string | StaticImageData | { default: StaticImageData }

export function GrayscaleTransitionImage(
  props: {
    src: ImageSrc
    className?: string
    sizes?: string
    priority?: boolean
    alt?: string
  },
) {
  let ref = useRef<React.ElementRef<'div'>>(null)
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 35%'],
  })
  let grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1])
  let filter = useMotionTemplate`grayscale(${grayscale})`

  return (
    <div ref={ref} className="group relative">
      <MotionOptimizedImage alt="" style={{ filter } as any} {...props} />
      <div
        className="pointer-events-none absolute top-0 left-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <OptimizedImage alt="" {...props} />
      </div>
    </div>
  )
}
