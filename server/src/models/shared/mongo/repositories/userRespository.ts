import { UserWithoutID } from '../../interfaces/user'
import { UserModel } from '../schemas/userSchema'
import { Types } from 'mongoose'
import { MakeFieldPartial } from '../../../../shared/utils/advanced_types/makeFieldPartial'
import {
    CreateUserError,
    CreateUserResult,
    GetUserError,
    GetUserResult,
} from '../../interfaces/userResults/userResults'
import {
    makeErr,
    makeOk,
} from '../../../../shared/utils/error_handling/result/result_helper'
import { logger } from '../../../../base/logging/logger'

const createUser = async (
    user: MakeFieldPartial<UserWithoutID, 'registeredAt'>
): CreateUserResult => {
    logger.info('UserRepository#createUser: Creating new User')
    if (await checkIfUsernameExists(user.username)) {
        logger.error(
            'UserRepository#createUser: Cant create User, username already exists'
        )
        return makeErr<CreateUserError>({
            sendable: true,
            type: 'Create User',
            message: 'User with that Username already exists',
        })
    }
    const mongoUser = new UserModel(user)
    const createdUser = await mongoUser.save()
    logger.info(
        'UserRepository#createUser: Created new User with ID: ' +
            createdUser._id
    )
    return makeOk(createdUser)
}

const changePassword = async (userID: Types.ObjectId, passwordHash: string) => {
    const mongoUser = await UserModel.findById(userID)
    if (!mongoUser) throw new Error('User with ID: ' + userID + ' doesnt exist')
    mongoUser.passwordHash = passwordHash
    mongoUser.save()
}

const getUserWithPasswordHash = async (username: string): GetUserResult => {
    const users = await UserModel.where('username')
        .equals(username)
        .select('+passwordHash')

    if (users.length === 0) {
        logger.error('UserRepository#getUserWithPasswordHash: User not found')
        return makeErr<GetUserError>({
            sendable: false,
            type: 'Get User',
            message: 'User doesnt exist',
        })
    }
    return makeOk(users[0])
}

export const checkIfUsernameExists = async (username: string) => {
    return (await UserModel.where('username').equals(username)).length > 0
}

export const UserRepository = {
    createUser: createUser,
    changePassword: changePassword,
    getUserWithPasswordHash: getUserWithPasswordHash,
    checkIfUsernameExists: checkIfUsernameExists,
}
