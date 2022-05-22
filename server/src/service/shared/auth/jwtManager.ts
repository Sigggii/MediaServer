import * as jose from 'jose'
import {
    IAuthManager,
    AuthUserInformation,
    IGenerateToken,
    IVerifyToken,
} from '../interfaces/auth/authMangager'

import DotEnvManager from '../../../base/envVariableManager/dotEnvManager'
import logger from '../../../base/logging/logger'

const generateToken: IGenerateToken = async (
    playload: AuthUserInformation,
    expirationTime: number
) => {
    logger.info('JWTManager#generateToken: Generating JWT')
    const jwtSecret = DotEnvManager.getEnvVariable('JWTSECRET')
    return new jose.SignJWT({ userID: playload.userID })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(expirationTime)
        .sign(Buffer.from(jwtSecret))
}

const verifyToken: IVerifyToken = async (token: string) => {
    const jwtSecret = DotEnvManager.getEnvVariable('JWTSECRET')
    try {
        const { payload } = await jose.jwtVerify(token, Buffer.from(jwtSecret))
        logger.info('JWTManager#verifyToken: JWT valid')
        return {
            isValid: true,
            authUserInfo: { userID: payload.userID as string },
        }
    } catch (err) {
        logger.warn('JWTManager#verifyToken: JWT invalid')
        return {
            isValid: false,
        }
    }
}

const JWTManager: IAuthManager = {
    generateToken,
    verifyToken,
}

export default JWTManager
