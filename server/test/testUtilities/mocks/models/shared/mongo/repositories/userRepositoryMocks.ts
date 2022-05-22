import { IUser } from '../../../../../../../src/models/shared/interfaces/user'
import UserRepository from '../../../../../../../src/models/shared/mongo/repositories/userRespository'
import {
    makeErr,
    makeOk,
} from '../../../../../../../src/shared/utils/error_handling/result/result_helper'
import spyOn = jest.spyOn
import {
    ICreateUserError,
    IGetUserError,
} from '../../../../../../../src/models/shared/interfaces/userResults/userResults'

export const createGetUserWithPasswordOkSpy = (returnValue: IUser) =>
    spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeOk(returnValue)
    )

export const createGetUserWithPasswordErrorSpy = (returnValue: IGetUserError) =>
    spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeErr(returnValue)
    )

export const createCreateUserOkSpy = (returnValue: IUser) =>
    spyOn(UserRepository, 'createUser').mockResolvedValue(makeOk(returnValue))

export const createCreateUserErrorSpy = (returnValue: ICreateUserError) =>
    spyOn(UserRepository, 'createUser').mockResolvedValue(makeErr(returnValue))

export const createCheckIfUsernameExistsSpy = (returnValue: boolean) =>
    spyOn(UserRepository, 'checkIfUsernameExists').mockResolvedValue(
        returnValue
    )
