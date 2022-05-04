import { User } from '../../../../../../../src/models/shared/interfaces/user'
import { UserRepository } from '../../../../../../../src/models/shared/mongo/repositories/userRespository'
import {
    makeErr,
    makeOk,
} from '../../../../../../../src/shared/utils/error_handling/result/result_helper'
import spyOn = jest.spyOn
import {
    CreateUserError,
    GetUserError,
} from '../../../../../../../src/models/shared/interfaces/userResults/userResults'

export const createGetUserWithPasswordOkSpy = (returnValue: User) => {
    return spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeOk(returnValue)
    )
}

export const createGetUserWithPasswordErrorSpy = (
    returnValue: GetUserError
) => {
    return spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeErr(returnValue)
    )
}

export const createCreateUserOkSpy = (returnValue: User) => {
    return spyOn(UserRepository, 'createUser').mockResolvedValue(
        makeOk(returnValue)
    )
}

export const createCreateUserErrorSpy = (returnValue: CreateUserError) => {
    return spyOn(UserRepository, 'createUser').mockResolvedValue(
        makeErr(returnValue)
    )
}

export const createCheckIfUsernameExistsSpy = (returnValue: boolean) => {
    return spyOn(UserRepository, 'checkIfUsernameExists').mockResolvedValue(
        returnValue
    )
}
