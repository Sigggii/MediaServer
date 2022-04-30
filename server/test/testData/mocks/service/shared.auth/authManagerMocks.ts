import spyOn = jest.spyOn
import { JWTManager } from '../../../../../src/service/shared/auth/jwtManager'

export const createGenerateTokenSpy = (returnValue: string) => {
    return spyOn(JWTManager, 'generateToken').mockResolvedValue(returnValue)
}
