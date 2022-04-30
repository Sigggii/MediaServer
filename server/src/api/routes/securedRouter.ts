import Router from 'koa-router'
import { auth } from '../middleware/shared/authMiddleware'

const securedRouter = new Router()

securedRouter.use(auth)

export const securedRoutes = securedRouter.routes()
export const securedAllowedMethods = securedRouter.allowedMethods()
