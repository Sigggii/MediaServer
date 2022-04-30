import { ResultError } from '../../shared/interfaces/utils/error_handling/resultError'
import { Context } from 'koa'
import { logger } from '../../base/logging/logger'

export const handleResultError = (
    err: NonNullable<ResultError>,
    ctx: Context
) => {
    logger.error(
        '#HandleResultError: Error: Sendable: ' +
            err.sendable +
            ', Type: ' +
            err.type +
            ', Message: ' +
            err.message
    )
    ctx.status = 400
    if (err.sendable) {
        ctx.body = {
            error: {
                type: err.type,
                message: err.message,
            },
        }
    } else {
        ctx.body = {
            error: {
                type: 'Unknown Error',
                message: '',
            },
        }
    }
}
