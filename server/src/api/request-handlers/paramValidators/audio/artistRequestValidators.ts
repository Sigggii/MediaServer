import { JSONSchemaType } from 'ajv'
import { CreateArtistParamRequestWithoutImage } from '../../../../service/audio/interfaces/params/artistParams'
import { ajv } from '../ajvInstance'

const createArtistRequestSchema: JSONSchemaType<CreateArtistParamRequestWithoutImage> =
    {
        type: 'object',
        properties: {
            name: { type: 'string' },
            genre: { type: 'string' },
        },
        required: ['name', 'genre'],
    }

export const createArtistRequestValidation = ajv.compile(
    createArtistRequestSchema
)
