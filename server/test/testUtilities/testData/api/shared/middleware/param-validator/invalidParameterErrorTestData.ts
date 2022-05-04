import {
    InvalidParameterError,
    InvalidParameterErrorEntry,
} from '../../../../../../../src/api/middleware/shared/param-validator/invalidParameterError'

export const createInvalidParameterError = (
    invalidParams: InvalidParameterErrorEntry[]
) => {
    return new InvalidParameterError(invalidParams)
}

export const createInvalidParameterErrorEntry = (
    param: string,
    message?: string
): InvalidParameterErrorEntry => {
    return {
        param: param,
        message: message,
    }
}
