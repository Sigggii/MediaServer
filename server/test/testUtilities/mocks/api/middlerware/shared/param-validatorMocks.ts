import ParamValidator from '../../../../../../src/api/middleware/shared/param-validator/param-validator'
import spyOn = jest.spyOn

const createValidateParamsSpy = <T>(data: unknown) =>
    spyOn(ParamValidator, 'validateParams').mockReturnValue(<T>data)

export default createValidateParamsSpy
