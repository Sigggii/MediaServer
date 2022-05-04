import {
    isErr,
    isOK,
} from '../../../../src/shared/utils/error_handling/result/result_helper'
import { AuthService } from '../../../../src/service/shared/auth/authService'

import { setupDotEnv } from '../../../testUtilities/setup/dotEnvSetup'
import {
    createHashPassword,
    createVerifyPasswordSpy,
} from '../../../testUtilities/mocks/service/shared.auth/hashManagerMocks'
import { createGenerateTokenSpy } from '../../../testUtilities/mocks/service/shared.auth/authManagerMocks'
import {
    createCreateUserErrorSpy,
    createCreateUserOkSpy,
    createGetUserWithPasswordErrorSpy,
    createGetUserWithPasswordOkSpy,
} from '../../../testUtilities/mocks/models/shared/mongo/repositories/userRepositoryMocks'
import { createUserMock } from '../../../testUtilities/mocks/models/shared/mongo/entities/userMocks'
import {
    createDetailedPasswordValidationErrorSpy,
    createDetailedPasswordValidationOkSpy,
} from '../../../testUtilities/mocks/shared/utils/auth/passwordValidationMocks'
import { InvalidPasswordError } from '../../../../src/shared/interfaces/utils/auth/validatePasswordResult'

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
            createGetUserWithPasswordErrorSpy({
                sendable: false,
                type: 'Get User',
                message: 'User doesnt exist',
            })

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

        test('returns Error on invalidPassword', async () => {
            createDetailedPasswordValidationErrorSpy({
                sendable: true,
                type: 'Invalid Password',
                message: [InvalidPasswordError.PASS_DIGIT],
            })

            const registerUserResult = await AuthService.registerUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(registerUserResult)).toBeTruthy()
            expect(registerUserResult.err).toStrictEqual({
                sendable: true,
                type: 'Invalid Password',
                message: [InvalidPasswordError.PASS_DIGIT],
            })
        })

        test('return Erorr if couldnt create User', async () => {
            createDetailedPasswordValidationOkSpy()
            createCreateUserErrorSpy({
                sendable: true,
                type: 'Create User',
                message: 'User with that Username already exists',
            })

            const registerUserResult = await AuthService.registerUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(registerUserResult)).toBeTruthy()
            expect(registerUserResult.err).toStrictEqual({
                sendable: true,
                type: 'Create User',
                message: 'User with that Username already exists',
            })
        })
    })
})
