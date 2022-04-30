import spyOn = jest.spyOn
import { PasswordValidation } from '../../../../../../src/shared/utils/auth/passwordValidation'
import { makeOk } from '../../../../../../src/shared/utils/error_handling/result/result_helper'

export const createDetailedPasswordValidationOkSpy = () => {
    return spyOn(
        PasswordValidation,
        'detailedPasswordValidation'
    ).mockReturnValue(makeOk(true))
}
