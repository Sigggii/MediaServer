import {
    isErr,
    isOK,
} from '../../../../src/shared/utils/error_handling/result/result_helper'
import { AuthService } from '../../../../src/service/shared/auth/authService'

import { setupDotEnv } from '../../../setup/dotEnvSetup'
import {
    createHashPassword,
    createVerifyPasswordSpy,
} from '../../../testData/mocks/service/shared.auth/hashManagerMocks'
import { createGenerateTokenSpy } from '../../../testData/mocks/service/shared.auth/authManagerMocks'
import {
    createCreateUserOkSpy,
    createGetUserWithPasswordErrorSpy,
    createGetUserWithPasswordOkSpy,
} from '../../../testData/mocks/model/shared/mongo/repositories/userRepositoryMocks'
import { createUserMock } from '../../../testData/mocks/model/shared/mongo/entities/userMocks'
import { createDetailedPasswordValidationOkSpy } from '../../../testData/mocks/shared/utils/auth/passwordValidationMocks'

describe('AuthService Test', () => {
    const realEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...realEnv }
        setupDotEnv()
    })

    afterAll(() => {
        process.env = realEnv
    })

    describe('signInUser', () => {
        test('handles Valid Input correctly', async () => {
            const userMock = createUserMock()
            const getUserSpy = createGetUserWithPasswordOkSpy(userMock)
            const verifyPasswordSpy = createVerifyPasswordSpy(true)
            const generateTokenSpy = createGenerateTokenSpy('lel')

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isOK(signInUserResult)).toBeTruthy()
            expect(signInUserResult.ok).toBe('lel')
            expect(getUserSpy).toHaveBeenCalledTimes(1)
            expect(verifyPasswordSpy).toHaveBeenCalledTimes(1)
            expect(generateTokenSpy).toHaveBeenCalledTimes(1)
        })

        test('return Error if user doesnt exist', async () => {
            createGetUserWithPasswordErrorSpy()

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(signInUserResult)).toBeTruthy()
            expect(signInUserResult.err).toStrictEqual({
                sendable: true,
                type: 'User SignIn',
                message: 'Username or Password invalid',
            })
        })

        test('return Error if password incorrect', async () => {
            createGetUserWithPasswordOkSpy(createUserMock())
            createVerifyPasswordSpy(false)

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(signInUserResult)).toBeTruthy()
            expect(signInUserResult.err).toStrictEqual({
                sendable: true,
                type: 'User SignIn',
                message: 'Username or Password invalid',
            })
        })
    })

    describe('registerUser', () => {
        test('handles Valid Input correctly', async () => {
            createDetailedPasswordValidationOkSpy()
            createHashPassword('hash')
            createCreateUserOkSpy(createUserMock())
            createGenerateTokenSpy('lel')

            const registerUserResult = await AuthService.registerUser({
                username: 'bert',
                password: 'password',
            })

            expect(isOK(registerUserResult)).toBeTruthy()
            expect(registerUserResult.ok).toBe('lel')
        })
    })
})
