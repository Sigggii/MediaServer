import spyOn = jest.spyOn
import AuthService from '../../../../../src/service/shared/auth/authService'
import {
    makeErr,
    makeOk,
} from '../../../../../src/shared/utils/error_handling/result/result_helper'
import {
    RegisterUserError,
    SignInUserError,
} from '../../../../../src/service/shared/interfaces/auth/authResult'

export const createRegisterUserOkSpy = (returnValue: string) =>
    spyOn(AuthService, 'registerUser').mockResolvedValue(makeOk(returnValue))

export const createRegisterUserErrorSpy = (returnValue: RegisterUserError) =>
    spyOn(AuthService, 'registerUser').mockResolvedValue(makeErr(returnValue))

export const createSignInUserOkSpy = (returnValue: string) =>
    spyOn(AuthService, 'signInUser').mockResolvedValue(makeOk(returnValue))

export const createSignInUserErrorSpy = (returnValue: SignInUserError) =>
    spyOn(AuthService, 'signInUser').mockResolvedValue(makeErr(returnValue))
