import { JSONSchemaType } from 'ajv'
import {
    RegisterParams,
    SignInParams,
} from '../../../../service/shared/interfaces/params/authParams'

import ajv from '../ajvInstance'

const registerRequestSchema: JSONSchemaType<RegisterParams> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
}

const signInUserRequestSchema: JSONSchemaType<SignInParams> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
}

export const registerRequestValidation = ajv.compile(registerRequestSchema)
export const signInUserValidation = ajv.compile(signInUserRequestSchema)
