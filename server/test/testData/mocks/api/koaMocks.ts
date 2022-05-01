import { createMockContext, createMockCookies } from '@shopify/jest-koa-mocks'
import { Context } from 'koa'
import spyOn = jest.spyOn
import { Cookies } from '@shopify/jest-koa-mocks/build/ts/create-mock-cookies'

export const createCTXMock = () => {
    return createMockContext()
}

export const createCookiesMock = () => {
    return createMockCookies()
}

export const createNextMock = () => {
    return jest.fn()
}
