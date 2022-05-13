import { createMockContext, createMockCookies } from '@shopify/jest-koa-mocks'
import { Context } from 'koa'
import spyOn = jest.spyOn
import { Cookies } from '@shopify/jest-koa-mocks/build/ts/create-mock-cookies'
import { NormalContext } from '../../../../src/api/utils/interfaces/customContexts'

export const createNormalCTXMock = () => {
    return createMockContext() as NormalContext
}

export const createCookiesMock = () => {
    return createMockCookies()
}

export const createNextMock = () => {
    return jest.fn()
}
