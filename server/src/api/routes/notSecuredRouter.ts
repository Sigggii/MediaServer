import Router from 'koa-router'
import { authAllowedMethods, authRoutes } from './shared/auth/authRouter'

const notSecuredRouter = new Router()

notSecuredRouter.use(authRoutes).use(authAllowedMethods)

export const notSecuredRoutes = notSecuredRouter.routes()
export const notSecuredAllowedMethods = notSecuredRouter.allowedMethods()
