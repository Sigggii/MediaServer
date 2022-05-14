import { Types } from 'mongoose'

export type IArtistWithoutID = {
    name: string
    genre: string
    imagePath: string
}

export type IArtist = { _id: Types.ObjectId | string } & IArtistWithoutID

export type ICreateArtistParams = Omit<IArtistWithoutID, 'imagePath'>
