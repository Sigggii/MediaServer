import { model, Schema } from 'mongoose'
import { Artist } from '../../interfaces/artist'

const artistSchema = new Schema<Artist>({
    name: { type: String, required: true },
    imagePath: { type: String, required: true },
})

export const artistSchemaModel = model('artist', artistSchema)
