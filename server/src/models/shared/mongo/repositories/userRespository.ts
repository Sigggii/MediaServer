import { Types } from 'mongoose'
import { IUserWithoutID } from '../../interfaces/user'
import UserModel from '../schemas/userSchema'
import { MakeFieldPartial } from '../../../../shared/utils/advanced_types/makeFieldPartial'
import {
    ICreateUserError,
    ICreateUserResult,
    IGetUserError,
    IGetUserResult,
} from '../../interfaces/userResults/userResults'
import {
    makeErr,
    makeOk,
} from '../../../../shared/utils/error_handling/result/result_helper'
import logger from '../../../../base/logging/logger'

const checkIfUsernameExists = async (username: string) =>
    (await UserModel.where('username').equals(username)).length > 0

const createUser = async (
    user: MakeFieldPartial<IUserWithoutID, 'registeredAt'>
): ICreateUserResult => {
    logger.info('UserRepository#createUser: Creating new User')
    if (await checkIfUsernameExists(user.username)) {
        logger.error(
            'UserRepository#createUser: Cant create User, username already exists'
        )
        return makeErr<ICreateUserError>({
            sendable: true,
            type: 'Create User',
            message: 'User with that Username already exists',
        })
    }
    const mongoUser = new UserModel(user)
    const createdUser = await mongoUser.save()
    logger.info(
        `UserRepository#createUser: Created new User with ID: ${createdUser._id}`
    )
    return makeOk(createdUser)
}

const changePassword = async (userID: Types.ObjectId, passwordHash: string) => {
    const mongoUser = await UserModel.findById(userID)
    if (!mongoUser) throw new Error(`User with ID: ${userID} doesnt exist`)
    mongoUser.passwordHash = passwordHash
    mongoUser.save()
}

const getUserWithPasswordHash = async (username: string): IGetUserResult => {
    const users = await UserModel.where('username')
        .equals(username)
        .select('+passwordHash')

    if (users.length === 0) {
        logger.error('UserRepository#getUserWithPasswordHash: User not found')
        return makeErr<IGetUserError>({
            sendable: false,
            type: 'Get User',
            message: 'User doesnt exist',
        })
    }
    return makeOk(users[0])
}

const UserRepository = {
    createUser,
    changePassword,
    getUserWithPasswordHash,
    checkIfUsernameExists,
}

export default UserRepository
