import { ID } from '../../../interfaces'

export type ITrackWithoutID = {
    title: string
    albumID: ID
    features: string[]
    genre: string
    releaseDate: Date
    titleNumber: number
    fileLength: number
    filePath: string
}

export type ITrack = { _id: ID } & ITrackWithoutID

export type IAddTrackParams = Omit<ITrackWithoutID, 'filePath'>

export type ITrackWithoutPath = Omit<ITrack, 'filePath'>
