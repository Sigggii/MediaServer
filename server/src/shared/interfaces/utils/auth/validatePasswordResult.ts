import { Result } from '../error_handling/result'

export enum InvalidPasswordError {
    PASS_LENGTH = 'Min. Password-Length: 10',
    PASS_LOWERCASE = 'At least 1 Lowercase Letter',
    PASS_UPPERCASE = 'At least 1 Uppercase Letter',
    PASS_DIGIT = 'At least 1 Digit',
    PASS_SYMBOL = 'At least 1 Symbol',
    PASS_SPACE = 'No Spaces allowed',
}

export type ValidatePasswordError = {
    sendable: true
    type: 'Invalid Password'
    message: InvalidPasswordError[]
}

export type ValidatePasswordResult = Result<true, ValidatePasswordError>
