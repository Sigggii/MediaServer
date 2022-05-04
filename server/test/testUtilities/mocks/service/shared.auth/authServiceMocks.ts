import spyOn = jest.spyOn
import { AuthService } from '../../../../../src/service/shared/auth/authService'
import {
    makeErr,
    makeOk,
} from '../../../../../src/shared/utils/error_handling/result/result_helper'
import {
    RegisterUserError,
    SignInUserError,
} from '../../../../../src/service/shared/interfaces/auth/authResult'

export const createRegisterUserOkSpy = (returnValue: string) => {
    return spyOn(AuthService, 'registerUser').mockResolvedValue(
        makeOk(returnValue)
    )
}

export const createRegisterUserErrorSpy = (returnValue: RegisterUserError) => {
    return spyOn(AuthService, 'registerUser').mockResolvedValue(
        makeErr(returnValue)
    )
}

export const createSignInUserOkSpy = (returnValue: string) => {
    return spyOn(AuthService, 'signInUser').mockResolvedValue(
        makeOk(returnValue)
    )
}

export const createSignInUserErrorSpy = (returnValue: SignInUserError) => {
    return spyOn(AuthService, 'signInUser').mockResolvedValue(
        makeErr(returnValue)
    )
}
