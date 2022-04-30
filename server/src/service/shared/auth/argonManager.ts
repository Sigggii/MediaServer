import {
    HashManager,
    HashPassword,
    VerifyPassword,
} from '../interfaces/auth/hashManager'
import { hash, verify } from 'argon2'
import { logger } from '../../../base/logging/logger'

const hashPassword: HashPassword = async (password: string) => {
    logger.info('ArgonManager#hashPassword: Hashing Password')
    return await hash(password)
}

const verifyPassword: VerifyPassword = async (
    hash: string,
    password: string
) => {
    const isValid = await verify(hash, password)
    logger.info('ArgonManager#isValid: Verify Password (Result: ' + isValid)
    return isValid
}

export const ArgonManager: HashManager = {
    hashPassword: hashPassword,
    verifyPassword: verifyPassword,
}
