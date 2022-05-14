import { createMockContext, createMockCookies } from '@shopify/jest-koa-mocks'

import { NormalContext } from '../../../../src/api/utils/interfaces/customContexts'

export const createNormalCTXMock = () => createMockContext() as NormalContext

export const createCookiesMock = () => createMockCookies()

export const createNextMock = () => jest.fn()
