import { Next } from 'koa'
import { logger } from '../../../base/logging/logger'
import { UnAuthorizedError } from './authMiddleware'
import { NormalContext } from '../../utils/interfaces/customContexts'
import { SendableError } from '../../utils/interfaces/SendableError'

export const errorHandler = async (ctx: NormalContext, next: Next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof Error && err.message === UnAuthorizedError.message) {
            logger.error('#ErrorHandler Client not authenticated')
            ctx.status = 401
            ctx.body = {
                error: {
                    type: 'Unauthenticated Error',
                    message: 'Plz Login',
                },
            }
        } else if (err instanceof SendableError) {
            logger.error(
                '#ErrorHandler Sendable Error: Name: ' +
                    err.name +
                    ' , Message: ' +
                    err.message
            )

            ctx.status = 400
            ctx.body = {
                error: {
                    type: err.name,
                    message: err.message,
                },
            }
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
            ctx.status = 500
            ctx.body = {
                error: {
                    type: 'Unexpected Error',
                    message: '',
                },
            }
        }
    }
}
