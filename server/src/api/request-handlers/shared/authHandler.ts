import {
    RegisterRequest,
    SignInRequest,
} from '../interfaces/requests/authRequests'
import { AuthService } from '../../../service/shared/auth/authService'
import { Context } from 'koa'

import {
    RegisterUserError,
    SignInUserError,
} from '../../../service/shared/interfaces/auth/authResult'
import { handleResult } from '../../../shared/utils/error_handling/result/result_helper'
import { handleResultError } from '../../utils/handleResultError'
import { ParamValidator } from '../../middleware/shared/param-validator/param-validator'
import {
    registerRequestValidation,
    signInUserValidation,
} from '../paramValidators/shared/authRequestValidators'

const handleSetJWTCookie = (jwt: string, ctx: Context) => {
    ctx.cookies.set('authCookie', jwt, {
        httpOnly: true,
    })
}

export const handleRegisterUser = async (ctx: Context) => {
    const userData: RegisterRequest = ParamValidator.validateParams(
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

export const handleSignInUser = async (ctx: Context) => {
    const userData: SignInRequest = ParamValidator.validateParams(
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
