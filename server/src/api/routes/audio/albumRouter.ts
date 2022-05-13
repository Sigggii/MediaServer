import Router from 'koa-router'
import { handleCreateAlbum } from '../../request-handlers/audio/albumHandler'
import { upload } from '../../middleware/shared/multer'

const albumRouter = new Router({ prefix: '/album' })

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

export const albumRoutes = albumRouter.routes()
export const albumAllowedMethods = albumRouter.allowedMethods()
