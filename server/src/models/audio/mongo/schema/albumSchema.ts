import { Album, AlbumType, AudioType } from '../../interfaces/mongo/album'
import { model, Schema } from 'mongoose'
import { trackSchema } from './trackSchema'

const albumSchema = new Schema<Album>({
    userID: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    artistID: { type: Schema.Types.ObjectId, required: true },
    genre: { type: String, required: true },
    albumType: { type: String, enum: AlbumType, required: true },
    audioType: { type: String, enum: AudioType, required: true },
    tracks: { type: [trackSchema], required: true, default: () => [] },
    coverPath: { type: String, required: false },
})

export const AlbumModel = model('album', albumSchema)
