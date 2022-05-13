import { Types } from 'mongoose'

export type TrackWithoutID = {
    title: string
    artist: Types.ObjectId | string
    features: [string]
    genre: string
    length: Number
    releaseDate: Date
    titleNumber: Number
    fileLength: Number
    filePath: string
}

export type Track = { _id: Types.ObjectId | string } & TrackWithoutID
