import spyOn = jest.spyOn
import { PasswordValidation } from '../../../../../../src/shared/utils/auth/passwordValidation'
import {
    makeErr,
    makeOk,
} from '../../../../../../src/shared/utils/error_handling/result/result_helper'
import { ValidatePasswordError } from '../../../../../../src/shared/interfaces/utils/auth/validatePasswordResult'

export const createDetailedPasswordValidationOkSpy = () => {
    return spyOn(
        PasswordValidation,
        'detailedPasswordValidation'
    ).mockReturnValue(makeOk(true))
}

export const createDetailedPasswordValidationErrorSpy = (
    returnValue: ValidatePasswordError
) => {
    return spyOn(
        PasswordValidation,
        'detailedPasswordValidation'
    ).mockReturnValue(makeErr(returnValue))
}
