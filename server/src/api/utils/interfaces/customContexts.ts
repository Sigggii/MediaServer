import { Context, ParameterizedContext } from 'koa'
import Router from 'koa-router'

export type NormalContext = ParameterizedContext<any, any, any>
