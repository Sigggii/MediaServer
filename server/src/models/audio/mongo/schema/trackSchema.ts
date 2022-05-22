import { Schema } from 'mongoose'
import { ITrackWithoutID } from '../../interfaces/mongo/tracks'

const trackSchema = new Schema<ITrackWithoutID>({
    title: { type: String, required: true },
    albumID: { type: Schema.Types.ObjectId, required: true },
    features: { type: [String], required: false, default: () => [] },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: false },
    titleNumber: { type: Number, required: true },
    fileLength: { type: Number, required: true },
    filePath: { type: String, required: false, select: false },
})

export default trackSchema
