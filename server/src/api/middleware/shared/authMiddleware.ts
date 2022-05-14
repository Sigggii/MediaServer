import { Next } from 'koa'
import JWTManager from '../../../service/shared/auth/jwtManager'
import logger from '../../../base/logging/logger'
import { NormalContext } from '../../utils/interfaces/customContexts'

export const UnAuthorizedError = new Error('Status: 401')

declare module 'koa' {
    interface Request {
        userID: string
    }
}

export const auth = async (ctx: NormalContext, next: Next) => {
    logger.info('AuthMiddleware#auth: authenticating user')
    const jwt = ctx.cookies.get('authCookie')
    if (!jwt) throw UnAuthorizedError
    const verifyTokenResult = await JWTManager.verifyToken(jwt)
    if (!verifyTokenResult.isValid) throw UnAuthorizedError
    ctx.request.userID = verifyTokenResult.authUserInfo.userID
    await next()
}
