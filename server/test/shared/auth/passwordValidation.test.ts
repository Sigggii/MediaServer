import { PasswordValidation } from '../../../src/shared/utils/auth/passwordValidation'
import { unwrapResult } from '../../../src/shared/utils/error_handling/result/result_helper'

test('min password length = 10', () => {
    const resultLength9 = PasswordValidation.validatePassword('PoN1yHof§')
    const resultLength10 = PasswordValidation.validatePassword('PoN1yHof§1')
    expect(resultLength9).toBeFalsy()
    expect(resultLength10).toBeTruthy()
})

test('password has to contain at least one lowercase letter', () => {
    const resultNoLowerCase = PasswordValidation.validatePassword('PON1YH0F§1')
    const resultOneLowerCase = PasswordValidation.validatePassword('PoN1YH0f§1')
    expect(resultNoLowerCase).toBeFalsy()
    expect(resultOneLowerCase).toBeTruthy()
})

test('password has to contain at least one uppercase letter', () => {
    const resultNoUpperCase = PasswordValidation.validatePassword('pon1yhof§1')
    const resultOneUpperCase = PasswordValidation.validatePassword('Pon1yhof§1')

    expect(resultNoUpperCase).toBeFalsy()
    expect(resultOneUpperCase).toBeTruthy()
})

test('password has to contain at least one digit', () => {
    const resultNoDigits = PasswordValidation.validatePassword('PoNiyHof§i')
    const resultOneDigit = PasswordValidation.validatePassword('PoNiyHof§1')
    expect(resultNoDigits).toBeFalsy()
    expect(resultOneDigit).toBeTruthy()
})

test('password has to contain at least one symbol', () => {
    const resultNoSymbol = PasswordValidation.validatePassword('PoN1yHofS1')
    const resultOneSymbol = PasswordValidation.validatePassword('PoN1yHof§1')
    expect(resultNoSymbol).toBeFalsy()
    expect(resultOneSymbol).toBeTruthy()
})

test('validation with details returns details', () => {
    const resultDetails =
        PasswordValidation.detailedPasswordValidation('falsy password')

    expect(unwrapResult(resultDetails)).toStrictEqual({
        sendable: true,
        type: 'Invalid Password',
        message: [
            'At least 1 Uppercase Letter',
            'At least 1 Digit',
            'At least 1 Symbol',
            'No Spaces allowed',
        ],
    })
})
