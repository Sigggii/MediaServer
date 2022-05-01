import spyOn = jest.spyOn
import { JWTManager } from '../../../../../src/service/shared/auth/jwtManager'
import { VerifyTokenResult } from '../../../../../src/service/shared/interfaces/auth/authMangager'

export const createGenerateTokenSpy = (returnValue: string) => {
    return spyOn(JWTManager, 'generateToken').mockResolvedValue(returnValue)
}

export const createVerifyTokenOKSpy = (returnValue: VerifyTokenResult) => {
    return spyOn(JWTManager, 'verifyToken').mockResolvedValue(returnValue)
}
