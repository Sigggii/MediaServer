import koaMulter from '@koa/multer'

const memoryStorage = koaMulter.memoryStorage()
export const upload = koaMulter({ storage: memoryStorage })
