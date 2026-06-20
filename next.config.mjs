import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)))

/**
 * output: 'export' produces a static site for Cloudflare Pages, but it is
 * incompatible with route handlers and HMR, so it is only enabled for
 * `next build` (NODE_ENV=production). In `next dev` the output is a normal
 * server. The CMS API is served in production by Cloudflare Pages Functions
 * (functions/api/cms) and in dev by `wrangler pages dev` (see dev:cms script).
 */
const isProductionBuild = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProductionBuild ? 'export' : undefined,
  outputFileTracingRoot: projectRoot,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '85',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0',
  },
}

export default nextConfig
