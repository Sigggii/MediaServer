import {
    isErr,
    isOK,
} from '../../../../src/shared/utils/error_handling/result/result_helper'
import { AuthService } from '../../../../src/service/shared/auth/authService'

import { setupDotEnv } from '../../../setup/dotEnvSetup'
import { createVerifyPasswordSpy } from '../../../testData/mocks/service/shared.auth/hashManagerMocks'
import { createGenerateTokenSpy } from '../../../testData/mocks/service/shared.auth/authManagerMocks'
import {
    createUserWithPasswordErrorSpy,
    createUserWithPasswordOkSpy,
} from '../../../testData/mocks/model/shared/mongo/repositories/userRepositoryMocks'
import { createUserMock } from '../../../testData/mocks/model/shared/mongo/entities/userMocks'

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
            const getUserSpy = createUserWithPasswordOkSpy(userMock)
            const verifyPasswordSpy = createVerifyPasswordSpy(true)
            const generateTokenSpy = createGenerateTokenSpy('lel')

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isOK(signInUserResult)).toBe(true)
            expect(signInUserResult.ok).toBe('lel')
            expect(getUserSpy).toHaveBeenCalledTimes(1)
            expect(verifyPasswordSpy).toHaveBeenCalledTimes(1)
            expect(generateTokenSpy).toHaveBeenCalledTimes(1)
        })

        test('return Error if user doesnt exist', async () => {
            createUserWithPasswordErrorSpy()

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(signInUserResult)).toBe(true)
            expect(signInUserResult.err).toStrictEqual({
                sendable: true,
                type: 'User SignIn',
                message: 'Username or Password invalid',
            })
        })

        test('return Error if password incorrect', async () => {
            createUserWithPasswordOkSpy(createUserMock())
            createVerifyPasswordSpy(false)

            const signInUserResult = await AuthService.signInUser({
                username: 'bert',
                password: 'password',
            })

            expect(isErr(signInUserResult)).toBe(true)
            expect(signInUserResult.err).toStrictEqual({
                sendable: true,
                type: 'User SignIn',
                message: 'Username or Password invalid',
            })
        })
    })
})
