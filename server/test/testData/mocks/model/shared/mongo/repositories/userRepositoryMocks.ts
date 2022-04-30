import { User } from '../../../../../../../src/models/shared/interfaces/user'
import { UserRepository } from '../../../../../../../src/models/shared/mongo/repositories/userRespository'
import {
    makeErr,
    makeOk,
} from '../../../../../../../src/shared/utils/error_handling/result/result_helper'
import spyOn = jest.spyOn

export const createUserWithPasswordOkSpy = (returnValue: User) => {
    return spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeOk(returnValue)
    )
}

export const createUserWithPasswordErrorSpy = () => {
    return spyOn(UserRepository, 'getUserWithPasswordHash').mockResolvedValue(
        makeErr({
            sendable: false,
            type: 'Get User',
            message: 'User doesnt exist',
        })
    )
}
