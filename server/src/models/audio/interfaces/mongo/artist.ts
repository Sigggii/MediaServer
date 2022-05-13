import { Types } from 'mongoose'

export type ArtistWithoutID = {
    name: string
    genre: string
    imagePath: string
}

export type Artist = { _id: Types.ObjectId | string } & ArtistWithoutID

export type CreateArtistParams = Omit<ArtistWithoutID, 'imagePath'>
