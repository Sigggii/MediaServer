import { model, Schema } from 'mongoose'
import { AudioPlaylist } from '../../interfaces/audioPlaylist'
import { trackSchema } from './trackSchema'

const audioPlaylistSchema = new Schema<AudioPlaylist>({
    userID: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: () => Date.now() },
    tracks: { type: [trackSchema], required: true },
    imagePath: { type: String, required: false },
})

export const audioPlaylistModel = model('audioPlaylist', audioPlaylistSchema)
