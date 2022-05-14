import koaMulter from '@koa/multer'

const memoryStorage = koaMulter.memoryStorage()
const upload = koaMulter({ storage: memoryStorage })
export default upload
