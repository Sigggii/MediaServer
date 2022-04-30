import { Result } from '../../../../../src/shared/interfaces/utils/error_handling/result'
import {
    handleResult,
    isErr,
    isOK,
    makeErr,
    makeOk,
    unwrapResult,
} from '../../../../../src/shared/utils/error_handling/result/result_helper'
import { ResultError } from '../../../../../src/shared/interfaces/utils/error_handling/resultError'

test('unwraps Ok Result correctly', () => {
    const result: Result<string, ResultError> = {
        ok: 'ok',
    }

    const actualUnwrapedResult = unwrapResult(result)

    expect(actualUnwrapedResult).toBe('ok')
})

test('unwraps Err Result correctly', () => {
    const result: Result<string, ResultError> = {
        err: {
            sendable: true,
            type: 'testError',
            message: 'testErrorMessage',
        },
    }

    const actualUnwrapedResult = unwrapResult(result)
    expect(actualUnwrapedResult).toStrictEqual({
        sendable: true,
        type: 'testError',
        message: 'testErrorMessage',
    })
})

test('isOK works correctly', () => {
    const okResult: Result<string, ResultError> = {
        ok: 'ok',
    }

    const errResult: Result<string, ResultError> = {
        err: {
            sendable: true,
            type: 'testError',
            message: 'testErrorMessage',
        },
    }
    expect(isOK(okResult)).toBeTruthy()
    expect(isOK(errResult)).toBeFalsy()
})

test('isErr works correctly', () => {
    const okResult: Result<string, ResultError> = {
        ok: 'ok',
    }

    const errResult: Result<string, ResultError> = {
        err: {
            sendable: true,
            type: 'testError',
            message: 'testErrorMessage',
        },
    }
    expect(isErr(errResult)).toBeTruthy()
    expect(isErr(okResult)).toBeFalsy()
})

test('makeOk works correctly', () => {
    const actualOk = makeOk('test')
    expect(actualOk).toBeTruthy()
})

test('makeErr works correctly', () => {
    const actualErr = makeErr({
        sendable: true,
        type: 'testError',
        message: 'testErrorMessage',
    })
    expect(isErr(actualErr)).toBeTruthy()
})

test('handleResult handles OkResult correctly', () => {
    const okResult: Result<string, ResultError> = {
        ok: 'ok',
    }

    const throwError = () => {
        throw Error('Alaaaarm')
    }

    const doNothing = () => {}

    expect(() => handleResult(okResult, throwError, doNothing)).toThrow(
        'Alaaaarm'
    )
})

test('handleResult handles ErrResult correctly', () => {
    const okResult: Result<string, ResultError> = {
        err: {
            sendable: true,
            type: 'testError',
            message: 'testErrorMessage',
        },
    }

    const throwError = () => {
        throw Error('Alaaaarm')
    }

    const doNothing = () => {}

    expect(() => handleResult(okResult, doNothing, throwError)).toThrow(
        'Alaaaarm'
    )
})
