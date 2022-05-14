import spyOn = jest.spyOn
import * as ResultErrorHandler from '../../../../../src/api/utils/handleResultError'

const createHandleResultErrorSpy = () => spyOn(ResultErrorHandler, 'default')

export default createHandleResultErrorSpy
