import Router from 'koa-router'
import { upload } from '../../middleware/shared/multer'
import { handleCreateArtist } from '../../request-handlers/audio/artistHandler'

const artistRouter = new Router({ prefix: '/artist' })

artistRouter.post(
    '/',
    upload.fields([
        { name: 'artistImage', maxCount: 1 },
        { name: 'artist', maxCount: 1 },
    ]),
    async (ctx) => {
        await handleCreateArtist(ctx)
    }
)

export const artistRoutes = artistRouter.routes()
export const artistAllowedMethods = artistRouter.allowedMethods()
