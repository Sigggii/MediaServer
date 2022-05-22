import spyOn = jest.spyOn
import JWTManager from '../../../../../src/service/shared/auth/jwtManager'
import { AuthUserInformation } from '../../../../../src/service/shared/interfaces/auth/authMangager'

export const createGenerateTokenSpy = (returnValue: string) =>
    spyOn(JWTManager, 'generateToken').mockResolvedValue(returnValue)

export const createVerifyTokenOKSpy = (returnValue: AuthUserInformation) =>
    spyOn(JWTManager, 'verifyToken').mockResolvedValue({
        isValid: true,
        authUserInfo: returnValue,
    })

export const createVerifyTokenInValidSpy = () =>
    spyOn(JWTManager, 'verifyToken').mockResolvedValue({
        isValid: false,
        authUserInfo: undefined,
    })
