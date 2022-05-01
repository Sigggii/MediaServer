import {
    createCookiesMock,
    createCTXMock,
    createNextMock,
} from '../../testData/mocks/api/koaMocks'
import { auth } from '../../../src/api/middleware/shared/authMiddleware'
import { createVerifyTokenOKSpy } from '../../testData/mocks/service/shared.auth/authManagerMocks'

describe('AuthMiddleware', () => {
    describe('auth', () => {
        test('accepts valid token', async () => {
            createVerifyTokenOKSpy({
                isValid: true,
                authUserInfo: {
                    userID: '1',
                },
            })
            const ctx = createCTXMock()
            const cookies = createCookiesMock()
            cookies.requestStore.set('authCookie', 'coolJWT')
            ctx.cookies = cookies

            const nextSpy = createNextMock()

            await auth(ctx, nextSpy)

            expect(nextSpy).toBeCalledTimes(1)
        })

        test('throws UnAuthorizedError if no JWT in Context', async () => {
            const ctx = createCTXMock()
            const nexSpy = createNextMock()
            console.log(ctx.cookies.get('authCookie'))
            await expect(auth(ctx, nexSpy)).rejects.toThrow('Status: 401')
        })
    })
})
