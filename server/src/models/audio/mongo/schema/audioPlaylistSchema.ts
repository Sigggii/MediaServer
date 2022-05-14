import { model, Schema } from 'mongoose'
import { IAudioPlaylist } from '../../interfaces/mongo/audioPlaylist'
import trackSchema from './trackSchema'

const audioPlaylistSchema = new Schema<IAudioPlaylist>({
    userID: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: () => Date.now() },
    tracks: { type: [trackSchema], required: true },
    imagePath: { type: String, required: false },
})

const AudioPlaylistModel = model('audioPlaylist', audioPlaylistSchema)

export default AudioPlaylistModel
