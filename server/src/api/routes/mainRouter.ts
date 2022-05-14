import Router from 'koa-router'
import { notSecuredAllowedMethods, notSecuredRoutes } from './notSecuredRouter'
import { securedAllowedMethods, securedRoutes } from './securedRouter'

const mainRouter = new Router({ prefix: '/api/v1' })

mainRouter.use(notSecuredRoutes).use(notSecuredAllowedMethods)
mainRouter.use(securedRoutes).use(securedAllowedMethods)

export const mainRoutes = mainRouter.routes()
export const mainAllowedMethods = mainRouter.allowedMethods()
