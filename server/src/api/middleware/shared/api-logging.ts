import Koa from 'koa'
import { logger } from '../../../base/logging/logger'
import { NormalContext } from '../../utils/interfaces/customContexts'

export const apiLogging = async (ctx: NormalContext, next: Koa.Next) => {
    logger.info(ctx.originalUrl)
    await next()
}
