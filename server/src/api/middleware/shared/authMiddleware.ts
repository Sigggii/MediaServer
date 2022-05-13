import { Context, Next } from 'koa'
import { JWTManager } from '../../../service/shared/auth/jwtManager'
import { logger } from '../../../base/logging/logger'
import { NormalContext } from '../../utils/interfaces/customContexts'

export const UnAuthorizedError = new Error('Status: 401')

export const auth = async (ctx: NormalContext, next: Next) => {
    logger.info('AuthMiddleware#auth: authenticating user')
    const jwt = ctx.cookies.get('authCookie')
    if (!jwt) throw UnAuthorizedError
    const verifyTokenResult = await JWTManager.verifyToken(jwt)
    if (!verifyTokenResult.isValid) throw UnAuthorizedError
    await next()
}
