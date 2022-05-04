import spyOn = jest.spyOn
import * as ResultErrorHandler from '../../../../../src/api/utils/handleResultError'

export const createHandleResultErrorSpy = () => {
    return spyOn(ResultErrorHandler, 'handleResultError')
}
