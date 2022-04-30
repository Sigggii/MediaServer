import { Types } from 'mongoose'

export type Track = {
    title: string
    artist: Types.ObjectId
    features: [string]
    genre: string
    length: Number
    releaseDate: Date
    titleNumber: Number
    fileLength: Number
    filePath: string
}
