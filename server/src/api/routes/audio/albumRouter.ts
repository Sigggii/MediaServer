import Router from 'koa-router'
import {
    handleAddTrack,
    handleCreateAlbum,
} from '../../request-handlers/audio/albumHandler'
import upload from '../../middleware/shared/multer'

const albumRouter = new Router({ prefix: '/albums' })

albumRouter.post(
    '/',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'album', maxCount: 1 },
    ]),
    async (ctx) => {
        await handleCreateAlbum(ctx)
    }
)

albumRouter.post(
    '/tracks',
    upload.fields([
        { name: 'trackFile', maxCount: 1 },
        { name: 'trackInfo', maxCount: 1 },
    ]),
    async (ctx) => {
        await handleAddTrack(ctx)
    }
)

export const albumRoutes = albumRouter.routes()
export const albumAllowedMethods = albumRouter.allowedMethods()
