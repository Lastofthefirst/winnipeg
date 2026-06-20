import { createCMSHandler } from 'dustcms/edge'
import { cmsConfig } from '../../../src/cms/config'

export const onRequest = createCMSHandler(cmsConfig)
