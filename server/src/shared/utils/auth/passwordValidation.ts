import PasswordValidator = require('password-validator')
import {
    InvalidPasswordError,
    ValidatePasswordError,
    ValidatePasswordResult,
} from '../../interfaces/utils/auth/validatePasswordResult'
import { makeErr, makeOk } from '../error_handling/result/result_helper'
import { logger } from '../../../base/logging/logger'

const passSchema = new PasswordValidator()
//prettier-ignore
passSchema
    .is().min(10, InvalidPasswordError.PASS_LENGTH)
    .has().lowercase(1, InvalidPasswordError.PASS_LOWERCASE)
    .has().uppercase(1,InvalidPasswordError.PASS_UPPERCASE)
    .has().digits(1,InvalidPasswordError.PASS_DIGIT)
    .has().symbols(1, InvalidPasswordError.PASS_SYMBOL)
    .has().not().spaces(0,InvalidPasswordError.PASS_SPACE)

const validatePassword = (password: string) => {
    return passSchema.validate(password) as boolean
}

const detailedPasswordValidation = (
    password: string
): ValidatePasswordResult => {
    const resultValidation = passSchema.validate(password, {
        details: true,
    }) as any[]
    if (resultValidation.length == 0) {
        logger.info(
            'PasswordValidation#detailedPasswordValidation: Password valid'
        )
        return makeOk(true)
    }

    const invalidMessages: InvalidPasswordError[] = resultValidation.map(
        (failedRule) => failedRule.message as InvalidPasswordError
    )

    logger.error(
        'PasswordValidation#detailedPasswordValidation: Password invalid (' +
            invalidMessages +
            ')'
    )
    return makeErr({
        sendable: true,
        type: 'Invalid Password',
        message: invalidMessages,
    })
}

export const PasswordValidation = {
    validatePassword: validatePassword,
    detailedPasswordValidation: detailedPasswordValidation,
}
