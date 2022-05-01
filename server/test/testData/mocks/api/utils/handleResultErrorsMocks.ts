import spyOn = jest.spyOn
import * as ResultErrorHandler from '../../../../../src/api/utils/handleResultError'

export const createHandleResultError = () => {
    return spyOn(ResultErrorHandler, 'handleResultError')
}
