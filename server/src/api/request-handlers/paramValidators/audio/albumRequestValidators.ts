import { JSONSchemaType } from 'ajv'
import { ICreateAlbumParamRequestWithoutImage } from '../../../../service/audio/interfaces/params/albumParams'
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

const createAlbumRequestValidation = ajv.compile(createAlbumRequestSchema)

export default createAlbumRequestValidation
