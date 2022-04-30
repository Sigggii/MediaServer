import { Result } from '../../../../shared/interfaces/utils/error_handling/result'
import { User } from '../user'
import { Types } from 'mongoose'

export type CreateUserError = {
    sendable: true
    type: 'Create User'
    message: 'User with that Username already exists'
}

export type CreateUserResult = Promise<Result<User, CreateUserError>>

export type GetUserError = {
    sendable: false
    type: 'Get User'
    message: 'User doesnt exist'
}

export type GetUserResult = Promise<Result<User, GetUserError>>
