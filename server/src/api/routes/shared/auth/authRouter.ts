import Router from 'koa-router'
import {
    handleRegisterUser,
    handleSignInUser,
} from '../../../request-handlers/shared/authHandler'

const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/register', async (ctx) => {
    await handleRegisterUser(ctx)
})

authRouter.post('/sign-in', async (ctx) => {
    await handleSignInUser(ctx)
})

export const authRoutes = authRouter.routes()
export const authAllowedMethods = authRouter.allowedMethods()
