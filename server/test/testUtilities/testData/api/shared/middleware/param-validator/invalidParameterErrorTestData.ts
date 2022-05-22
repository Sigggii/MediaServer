import {
    InvalidParameterError,
    InvalidParameterErrorEntry,
} from '../../../../../../../src/api/middleware/shared/param-validator/invalidParameterError'

export const createInvalidParameterError = (
    invalidParams: InvalidParameterErrorEntry[]
) => new InvalidParameterError(invalidParams)

export const createInvalidParameterErrorEntry = (
    param: string,
    message?: string
): InvalidParameterErrorEntry => ({
    param,
    message,
})
