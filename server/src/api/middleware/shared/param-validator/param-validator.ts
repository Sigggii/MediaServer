import { ValidateFunction } from 'ajv'
import { Context, Next } from 'koa'
import {
    InvalidParameterError,
    InvalidParameterErrorEntry,
} from './invalidParameterError'

const validateParams = <T extends Object>(
    validation: ValidateFunction<T>,
    data: Object
): T => {
    if (validation(data)) return <T>data
    else {
        const errors = validation.errors
        const errorEntries: InvalidParameterErrorEntry[] = []
        errors?.forEach((err) =>
            errorEntries.push({
                param: err.instancePath.replace('/', ''),
                message: err.message,
            })
        )
        throw new InvalidParameterError(errorEntries)
    }
}

const handleParamValidationError = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof InvalidParameterError) {
            ctx.status = 400
            ctx.body = {
                error: err.name,
                details: 'Missing or Invalid Parameters',
                params: err.invalidParamEntries,
            }
        } else throw err
    }
}

export const ParamValidator = {
    validateParams: validateParams,
    handleParamValidationError: handleParamValidationError,
}
