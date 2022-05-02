import spyOn = jest.spyOn
import { JWTManager } from '../../../../../src/service/shared/auth/jwtManager'
import {
    AuthUserInformation,
    VerifyTokenResult,
} from '../../../../../src/service/shared/interfaces/auth/authMangager'

export const createGenerateTokenSpy = (returnValue: string) => {
    return spyOn(JWTManager, 'generateToken').mockResolvedValue(returnValue)
}

export const createVerifyTokenOKSpy = (returnValue: AuthUserInformation) => {
    return spyOn(JWTManager, 'verifyToken').mockResolvedValue({
        isValid: true,
        authUserInfo: returnValue,
    })
}

export const createVerifyTokenInValidSpy = () => {
    return spyOn(JWTManager, 'verifyToken').mockResolvedValue({
        isValid: false,
        authUserInfo: undefined,
    })
}
