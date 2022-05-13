import { model, Schema } from 'mongoose'
import { ArtistWithoutID } from '../../interfaces/mongo/artist'

const artistSchema = new Schema<ArtistWithoutID>({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    imagePath: { type: String, required: false },
})

export const ArtistModel = model('artist', artistSchema)
