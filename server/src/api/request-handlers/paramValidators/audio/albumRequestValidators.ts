import { JSONSchemaType } from 'ajv'
import {
    IAddTrackParamRequestWithoutImage,
    ICreateAlbumParamRequestWithoutImage,
} from '../../../../service/audio/interfaces/params/albumParams'
import ajv from '../ajvInstance'
import {
    AlbumType,
    AudioType,
} from '../../../../models/audio/interfaces/mongo/album'

const createAlbumRequestSchema: JSONSchemaType<ICreateAlbumParamRequestWithoutImage> =
    {
        type: 'object',
        properties: {
            title: { type: 'string' },
            artistID: { type: 'string' },
            genre: { type: 'string' },
            albumType: { type: 'string', enum: Object.values(AlbumType) },
            audioType: { type: 'string', enum: Object.values(AudioType) },
        },
        required: ['title', 'artistID', 'albumType', 'audioType', 'genre'],
    }

export const createAlbumRequestValidation = ajv.compile(
    createAlbumRequestSchema
)

const addTrackRequestSchema: JSONSchemaType<IAddTrackParamRequestWithoutImage> =
    {
        type: 'object',
        properties: {
            title: { type: 'string' },
            albumID: { type: 'string' },
            features: { type: 'array', items: { type: 'string' } },
            genre: { type: 'string' },
            releaseDate: { type: 'string' },
            titleNumber: { type: 'number' },
        },
        required: [
            'title',
            'albumID',
            'features',
            'genre',
            'releaseDate',
            'titleNumber',
        ],
    }

export const addTrackRequestValidation = ajv.compile(addTrackRequestSchema)
