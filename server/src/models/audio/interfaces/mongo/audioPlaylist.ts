import { Types } from 'mongoose'
import { TrackWithoutID } from './track'

export type AudioPlaylist = {
    userID: Types.ObjectId
    name: string
    description: string
    createdAt: Date
    tracks: [TrackWithoutID]
    imagePath: string
}
