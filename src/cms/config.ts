import type { CmsConfig } from 'dustcms/types'

export const cmsConfig: CmsConfig = {
  contentFiles: { en: 'content/cms/en.json', fr: 'content/cms/fr.json' },
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  sections: [],
  git: {
    provider: 'github',
    owner: 'Lastofthefirst',
    repo: 'winnipeg',
    branch: 'main',
  },
  allowedPaths: ['content/'],
  rateLimit: { windowSeconds: 900, maxAttempts: 5 },
}
