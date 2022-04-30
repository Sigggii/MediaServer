import { Context, Next } from 'koa'
import { logger } from '../../../base/logging/logger'
import { UnAuthorizedError } from './authMiddleware'

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof Error && err.message === UnAuthorizedError.message) {
            logger.error('#ErrorHandler Client not authenticated')
            ctx.status = 401
            ctx.body = 'Not Authenticated'
        } else {
            if (err instanceof Error) {
                logger.error(
                    '#ErrorHandler Unexpected Error: ' +
                        err +
                        '\n' +
                        ' Stacktrace: ' +
                        err.stack
                )
            } else {
                logger.error('#ErrorHandler Unexpected Error: ' + err)
            }
            ctx.body = {
                error: {
                    type: 'Unexpected Error',
                    message: '',
                },
            }
        }
    }
}
