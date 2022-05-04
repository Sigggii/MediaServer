import { ParamValidator } from '../../../../src/api/middleware/shared/param-validator/param-validator'
import {
    ParamValidatorTestObject,
    paramValidatorTestValidation,
} from '../../../testUtilities/testData/api/shared/middleware/param-validator/param-validatorTestData'
import {
    InvalidParameterError,
    InvalidParameterErrorEntry,
} from '../../../../src/api/middleware/shared/param-validator/invalidParameterError'
import { createCTXMock } from '../../../testUtilities/mocks/api/koaMocks'
import {
    createInvalidParameterError,
    createInvalidParameterErrorEntry,
} from '../../../testUtilities/testData/api/shared/middleware/param-validator/invalidParameterErrorTestData'

describe('ParamValidator Test', () => {
    describe('validateParams', () => {
        it('returns data if everything is valid', () => {
            const testData: ParamValidatorTestObject = {
                testNumber: 1,
                testString: 'test',
            }

            const actualTestData = ParamValidator.validateParams(
                paramValidatorTestValidation,
                testData
            )

            expect(actualTestData).toStrictEqual(testData)
        })

        it('throws InvalidParameterError', () => {
            const invalidTestData = {
                testNumber: 'NotANumber',
            }

            expect(() =>
                ParamValidator.validateParams(
                    paramValidatorTestValidation,
                    invalidTestData
                )
            ).toThrow(InvalidParameterError)
        })
    })

    describe('handleParamValidationError', () => {
        it('handles caught InvalidParameterError correctly', async () => {
            const ctx = createCTXMock()
            const invalidParam = createInvalidParameterErrorEntry(
                'testParam',
                'testMessage'
            )

            const invalidParamsError = createInvalidParameterError([
                invalidParam,
            ])

            const next = async () => {
                throw invalidParamsError
            }
            await ParamValidator.handleParamValidationError(ctx, next)
            expect(ctx.status).toBe(400)
            expect(ctx.body).toStrictEqual({
                error: invalidParamsError.name,
                details: 'Missing or Invalid Parameters',
                params: invalidParamsError.invalidParamEntries,
            })
        })

        it('throws Error again if its not a InvalidParameterError', async () => {
            const ctx = createCTXMock()
            const next = async () => {
                throw new Error('This Error should be ignored')
            }

            await expect(
                ParamValidator.handleParamValidationError(ctx, next)
            ).rejects.toThrow('This Error should be ignored')
        })
    })
})
