import { Types } from 'mongoose'

export type IArtistWithoutID = {
    userID: Types.ObjectId | string
    name: string
    genre: string
    imagePath: string
}

export type IArtist = { _id: Types.ObjectId | string } & IArtistWithoutID

export type IArtistWithoutImagePath = Omit<IArtist, 'imagePath'>

export type ICreateArtistParams = Omit<IArtistWithoutID, 'imagePath'>
