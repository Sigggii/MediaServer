import ArgonManager from '../../../../../src/service/shared/auth/argonManager'
import spyOn = jest.spyOn

export const createVerifyPasswordSpy = (returnValue: boolean) =>
    spyOn(ArgonManager, 'verifyPassword').mockResolvedValue(returnValue)

export const createHashPassword = (returnValue: string) =>
    spyOn(ArgonManager, 'hashPassword').mockResolvedValue(returnValue)
