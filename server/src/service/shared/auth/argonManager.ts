import { hash, verify } from 'argon2'
import {
    HashManager,
    HashPassword,
    VerifyPassword,
} from '../interfaces/auth/hashManager'
import logger from '../../../base/logging/logger'

const hashPassword: HashPassword = async (password: string) => {
    logger.info('ArgonManager#hashPassword: Hashing Password')
    return hash(password)
}

const verifyPassword: VerifyPassword = async (
    hashString: string,
    password: string
) => {
    const isValid = await verify(hashString, password)
    logger.info(`ArgonManager#isValid: Verify Password (Result: ${isValid}`)
    return isValid
}

const ArgonManager: HashManager = {
    hashPassword,
    verifyPassword,
}

export default ArgonManager
