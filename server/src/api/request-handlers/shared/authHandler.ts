import {
    RegisterParams,
    SignInParams,
} from '../../../service/shared/interfaces/params/authParams'
import AuthService from '../../../service/shared/auth/authService'

import {
    RegisterUserError,
    SignInUserError,
} from '../../../service/shared/interfaces/auth/authResult'
import { handleResult } from '../../../shared/utils/error_handling/result/result_helper'
import handleResultError from '../../utils/handleResultError'
import ParamValidator from '../../middleware/shared/param-validator/param-validator'
import {
    registerRequestValidation,
    signInUserValidation,
} from '../paramValidators/shared/authRequestValidators'
import { NormalContext } from '../../utils/interfaces/customContexts'

const handleSetJWTCookie = (jwt: string, ctx: NormalContext) => {
    ctx.cookies.set('authCookie', jwt, {
        httpOnly: true,
    })
}

export const handleRegisterUser = async (ctx: NormalContext) => {
    const userData: RegisterParams = ParamValidator.validateParams(
        registerRequestValidation,
        ctx.request.body
    )

    const registerUserResult = await AuthService.registerUser(userData)

    const handleRegisterUserSuccess = (jwt: string) => {
        ctx.status = 201
        handleSetJWTCookie(jwt, ctx)
    }

    const handleRegisterUserError = (err: RegisterUserError) => {
        handleResultError(err, ctx)
    }

    handleResult(
        registerUserResult,
        handleRegisterUserSuccess,
        handleRegisterUserError
    )
}

export const handleSignInUser = async (ctx: NormalContext) => {
    const userData: SignInParams = ParamValidator.validateParams(
        signInUserValidation,
        ctx.request.body
    )
    const signInUserResult = await AuthService.signInUser(userData)

    const handleSignInUserSuccess = (jwt: string) => {
        ctx.status = 200
        handleSetJWTCookie(jwt, ctx)
    }

    const handleSignInUserError = (err: SignInUserError) => {
        handleResultError(err, ctx)
    }

    handleResult(
        signInUserResult,
        handleSignInUserSuccess,
        handleSignInUserError
    )
}
