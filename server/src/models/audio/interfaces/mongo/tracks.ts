import { Types } from 'mongoose'

export type ITrackWithoutID = {
    title: string
    artist: Types.ObjectId | string
    features: [string]
    genre: string
    length: number
    releaseDate: Date
    titleNumber: number
    fileLength: number
    filePath: string
}

export type ITrack = { _id: Types.ObjectId | string } & ITrackWithoutID
