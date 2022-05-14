import { Schema } from 'mongoose'
import { ITrackWithoutID } from '../../interfaces/mongo/tracks'

const trackSchema = new Schema<ITrackWithoutID>({
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, required: true },
    features: { type: [String], required: true },
    genre: { type: String, required: true },
    length: { type: Number, required: true },
    releaseDate: { type: Date, required: false },
    titleNumber: { type: Number, required: true },
    fileLength: { type: Number, required: true },
    filePath: { type: String, required: true },
})

export default trackSchema
