import {
    Result,
    Ok,
    Err,
} from '../../../interfaces/utils/error_handling/result'
import { ResultError } from '../../../interfaces/utils/error_handling/resultError'

export type UnwrapResult = <T, U extends ResultError>(
    e: Result<T, U>
) => NonNullable<T | U>

export const unwrapResult: UnwrapResult = <T, U extends ResultError>({
    ok,
    err,
}: Result<T, U>) => {
    if (ok !== undefined && err !== undefined) {
        throw new Error(
            `Received both Ok and Err values at runtime when opening an Result\nOK: ${JSON.stringify(
                ok
            )}\nERR: ${JSON.stringify(err)}`
        )
    }

    if (ok !== undefined) {
        return ok as NonNullable<T> // Typescript is getting confused and returning this type as `T | undefined` unless we add the type assertion
    }
    if (err !== undefined) {
        return err as NonNullable<U>
    }
    throw new Error(
        `Received no ok or err values at runtime when opening Either`
    )
}

export const isOK = <T, U extends ResultError>(e: Result<T, U>): e is Ok<T> =>
    e.ok !== undefined

export const isErr = <T, U extends ResultError>(e: Result<T, U>): e is Err<U> =>
    e.err !== undefined

export const makeOk = <T>(value: T): Ok<T> => ({ ok: value })

export const makeErr = <U extends ResultError>(value: U): Err<U> => ({
    err: value,
})

export const handleResult = <T, U extends ResultError>(
    result: Result<T, U>,
    handleOK: (okValue: T) => void,
    handleErr: (errValue: U) => void
) => {
    if (isOK(result)) {
        handleOK(unwrapResult(result))
    } else {
        handleErr(unwrapResult(result))
    }
}
