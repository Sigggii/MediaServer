import { model, Schema } from 'mongoose'
import { IArtistWithoutID } from '../../interfaces/mongo/artist'

const artistSchema = new Schema<IArtistWithoutID>({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    imagePath: { type: String, required: false },
})

const ArtistModel = model('artist', artistSchema)

export default ArtistModel
