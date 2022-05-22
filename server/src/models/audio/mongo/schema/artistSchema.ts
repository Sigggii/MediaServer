import { model, Schema } from 'mongoose'
import { IArtistWithoutID } from '../../interfaces/mongo/artist'

const artistSchema = new Schema<IArtistWithoutID>({
    userID: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true },
    imagePath: { type: String, required: false, select: false },
})

const ArtistModel = model('artist', artistSchema)

export default ArtistModel
