import Router from 'koa-router'
import { auth } from '../middleware/shared/authMiddleware'
import { albumAllowedMethods, albumRoutes } from './audio/albumRouter'
import { artistAllowedMethods, artistRoutes } from './audio/artistRouter'

const securedRouter = new Router()

securedRouter.use(auth)
securedRouter.use(albumRoutes).use(albumAllowedMethods)
securedRouter.use(artistRoutes).use(artistAllowedMethods)

export const securedRoutes = securedRouter.routes()
export const securedAllowedMethods = securedRouter.allowedMethods()
