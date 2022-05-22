import {
    createRegisterUserErrorSpy,
    createRegisterUserOkSpy,
    createSignInUserErrorSpy,
    createSignInUserOkSpy,
} from '../../../testUtilities/mocks/service/shared.auth/authServiceMocks'
import { createNormalCTXMock } from '../../../testUtilities/mocks/api/koaMocks'
import {
    handleRegisterUser,
    handleSignInUser,
} from '../../../../src/api/request-handlers/shared/authHandler'
import createHandleResultErrorSpy from '../../../testUtilities/mocks/api/utils/handleResultErrorsMocks'
import { ICreateUserError } from '../../../../src/models/shared/interfaces/userResults/userResults'
import { SignInUserError } from '../../../../src/service/shared/interfaces/auth/authResult'
import createValidateParamsSpy from '../../../testUtilities/mocks/api/middlerware/shared/param-validatorMocks'
import {
    registerRequestValidation,
    signInUserValidation,
} from '../../../../src/api/request-handlers/paramValidators/shared/authRequestValidators'

describe('AuthHandler Test', () => {
    describe('handlerRegisterUser', () => {
        test('handles successful registration correctly', async () => {
            createRegisterUserOkSpy('coolJWT')
            const ctx = createNormalCTXMock()
            const validateParamsSpy = createValidateParamsSpy(ctx.request.body)
            await handleRegisterUser(ctx)

            expect(ctx.status).toBe(201)
            expect(validateParamsSpy).toHaveBeenCalledWith(
                registerRequestValidation,
                ctx.request.body
            )
            expect(ctx.cookies.set).toHaveBeenCalledWith(
                'authCookie',
                'coolJWT',
                { httpOnly: true }
            )
        })

        test('handles Error on failed UserRegistration', async () => {
            const registerUserError: ICreateUserError = {
                sendable: true,
                type: 'Create User',
                message: 'User with that Username already exists',
            }

            createRegisterUserErrorSpy(registerUserError)
            const handleErrorSpy = createHandleResultErrorSpy()
            const ctxMock = createNormalCTXMock()
            createValidateParamsSpy(ctxMock.request.body)
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
            const ctx = createNormalCTXMock()
            const validateParamsSpy = createValidateParamsSpy(ctx.request.body)
            await handleSignInUser(ctx)

            expect(ctx.status).toBe(200)
            expect(validateParamsSpy).toHaveBeenCalledWith(
                signInUserValidation,
                ctx.request.body
            )
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
            const handleErrorSpy = createHandleResultErrorSpy()
            const ctx = createNormalCTXMock()
            createValidateParamsSpy(ctx.request.body)

            await handleSignInUser(ctx)

            expect(handleErrorSpy).toHaveBeenCalledWith(error, ctx)
        })
    })
})
