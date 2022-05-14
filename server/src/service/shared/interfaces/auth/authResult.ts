import { Result } from '../../../../shared/interfaces/utils/error_handling/result'
import { ValidatePasswordError } from '../../../../shared/interfaces/utils/auth/validatePasswordResult'
import { ICreateUserError } from '../../../../models/shared/interfaces/userResults/userResults'

export type RegisterUserError = ValidatePasswordError | ICreateUserError

export type RegisterUserResult = Promise<Result<string, RegisterUserError>>

export type SignInUserError = {
    sendable: true
    type: 'User SignIn'
    message: 'Username or Password invalid'
}

export type SignInUserResult = Promise<Result<string, SignInUserError>>
