import { JSONSchemaType } from 'ajv'
import { ICreateArtistParamRequestWithoutImage } from '../../../../service/audio/interfaces/params/artistParams'
import ajv from '../ajvInstance'

const createArtistRequestSchema: JSONSchemaType<ICreateArtistParamRequestWithoutImage> =
    {
        type: 'object',
        properties: {
            name: { type: 'string' },
            genre: { type: 'string' },
        },
        required: ['name', 'genre'],
    }

const createArtistRequestValidation = ajv.compile(createArtistRequestSchema)

export default createArtistRequestValidation
