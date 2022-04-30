import { ArgonManager } from '../../../../../src/service/shared/auth/argonManager'
import spyOn = jest.spyOn

export const createVerifyPasswordSpy = (returnValue: boolean) => {
    return spyOn(ArgonManager, 'verifyPassword').mockResolvedValue(returnValue)
}
