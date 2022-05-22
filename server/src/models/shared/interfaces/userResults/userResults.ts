import { Result } from '../../../../shared/interfaces/utils/error_handling/result'
import { IUser } from '../user'

export type ICreateUserError = {
    sendable: true
    type: 'Create User'
    message: 'User with that Username already exists'
}

export type ICreateUserResult = Promise<Result<IUser, ICreateUserError>>

export type IGetUserError = {
    sendable: false
    type: 'Get User'
    message: 'User doesnt exist'
}

export type IGetUserResult = Promise<Result<IUser, IGetUserError>>
