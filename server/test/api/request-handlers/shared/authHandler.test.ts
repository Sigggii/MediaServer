import {
    createRegisterUserErrorSpy,
    createRegisterUserOkSpy,
    createSignInUserErrorSpy,
    createSignInUserOkSpy,
} from '../../../testData/mocks/service/shared.auth/authServiceMocks'
import { createCTXMock } from '../../../testData/mocks/api/koaMocks'
import {
    handleRegisterUser,
    handleSignInUser,
} from '../../../../src/api/request-handlers/shared/authHandler'
import { createHandleResultError } from '../../../testData/mocks/api/utils/handleResultErrorsMocks'
import { CreateUserError } from '../../../../src/models/shared/interfaces/userResults/userResults'
import { SignInUserError } from '../../../../src/service/shared/interfaces/auth/authResult'

describe('AuthHandler Test', () => {
    describe('handlerRegisterUser', () => {
        test('handles successful registration correctly', async () => {
            createRegisterUserOkSpy('coolJWT')
            const ctx = createCTXMock()

            await handleRegisterUser(ctx)

            expect(ctx.status).toBe(201)
            expect(ctx.cookies.set).toHaveBeenCalledWith(
                'authCookie',
                'coolJWT',
                { httpOnly: true }
            )
        })

        test('handles Error on failed UserRegistration', async () => {
            const registerUserError: CreateUserError = {
                sendable: true,
                type: 'Create User',
                message: 'User with that Username already exists',
            }

            createRegisterUserErrorSpy(registerUserError)
            const handleErrorSpy = createHandleResultError()
            const ctxMock = createCTXMock()

            await handleRegisterUser(ctxMock)

            expect(handleErrorSpy).toHaveBeenCalledWith(
                registerUserError,
                ctxMock
            )
        })
    })

    describe('handleSignInUser', () => {
        test('handles successful SignIn correctly', async () => {
            createSignInUserOkSpy('coolJWT')
            const ctx = createCTXMock()

            await handleSignInUser(ctx)

            expect(ctx.status).toBe(200)
            expect(ctx.cookies.set).toHaveBeenCalledWith(
                'authCookie',
                'coolJWT',
                { httpOnly: true }
            )
        })

        test('handles Error on failed SignIn', async () => {
            const error: SignInUserError = {
                sendable: true,
                type: 'User SignIn',
                message: 'Username or Password invalid',
            }

            createSignInUserErrorSpy(error)
            const handleErrorSpy = createHandleResultError()
            const ctx = createCTXMock()

            await handleSignInUser(ctx)

            expect(handleErrorSpy).toHaveBeenCalledWith(error, ctx)
        })
    })
})
