import { ValidateFunction } from 'ajv'
import { Next } from 'koa'
import {
    InvalidParameterError,
    InvalidParameterErrorEntry,
} from './invalidParameterError'
import { NormalContext } from '../../../utils/interfaces/customContexts'

const validateParams = <T>(
    validation: ValidateFunction<T>,
    data: unknown
): T => {
    if (validation(data)) return <T>data

    const { errors } = validation
    const errorEntries: InvalidParameterErrorEntry[] = []
    errors?.forEach((err) =>
        errorEntries.push({
            param: err.instancePath.replace('/', ''),
            message: err.message,
        })
    )
    throw new InvalidParameterError(errorEntries)
}

const handleParamValidationError = async (ctx: NormalContext, next: Next) => {
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

const ParamValidator = {
    validateParams,
    handleParamValidationError,
}

export default ParamValidator
