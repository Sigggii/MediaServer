import Koa, { Middleware } from 'koa'
import { logger } from '../../../base/logging/logger'
import { IMiddleware } from 'koa-router'

export const apiLogging = async (ctx: Koa.Context, next: Koa.Next) => {
    logger.info(ctx.originalUrl)
    await next()
}
