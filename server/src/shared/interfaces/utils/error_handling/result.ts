import { ResultError } from './resultError'

export type Ok<T> = {
    ok: T
    err?: never
}

export type Err<U extends ResultError> = {
    ok?: never
    err: U
}

export type Result<T, U extends ResultError> = NonNullable<Ok<T> | Err<U>>
