import { ParamValidator } from '../../../../../../src/api/middleware/shared/param-validator/param-validator'
import spyOn = jest.spyOn
import { Context } from 'koa'

export const createValidateParamsSpy = <T>(data: Object) => {
    return spyOn(ParamValidator, 'validateParams').mockReturnValue(<T>data)
}
