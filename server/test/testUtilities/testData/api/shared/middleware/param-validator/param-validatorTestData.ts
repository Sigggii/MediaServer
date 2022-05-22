import Ajv, { JSONSchemaType } from 'ajv'

export const testAjv = new Ajv({ allErrors: true })

export interface ParamValidatorTestObject {
    testNumber: number
    testString: string
}

const paramValidatorTestSchema: JSONSchemaType<ParamValidatorTestObject> = {
    type: 'object',
    properties: {
        testNumber: { type: 'number' },
        testString: { type: 'string' },
    },
    required: ['testNumber', 'testString'],
}

export const paramValidatorTestValidation = testAjv.compile(
    paramValidatorTestSchema
)
