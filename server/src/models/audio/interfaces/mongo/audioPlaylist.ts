import { Types } from 'mongoose'
import { ITrackWithoutID } from './tracks'

export type IAudioPlaylist = {
    userID: Types.ObjectId
    name: string
    description: string
    createdAt: Date
    tracks: [ITrackWithoutID]
    imagePath: string
}
