import { Types } from 'mongoose'
import { Track } from './track'

export type AudioPlaylist = {
    userID: Types.ObjectId
    name: string
    description: string
    createdAt: Date
    tracks: [Track]
    imagePath: string
}
