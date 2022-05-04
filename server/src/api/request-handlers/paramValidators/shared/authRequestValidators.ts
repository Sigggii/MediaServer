import { JSONSchemaType } from 'ajv'
import {
    RegisterRequest,
    SignInRequest,
} from '../../interfaces/requests/authRequests'

import { ajv } from '../ajvInstance'

const registerRequestSchema: JSONSchemaType<RegisterRequest> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
}

const signInUserRequestSchema: JSONSchemaType<SignInRequest> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
}

export const registerRequestValidation = ajv.compile(registerRequestSchema)
export const signInUserValidation = ajv.compile(signInUserRequestSchema)
