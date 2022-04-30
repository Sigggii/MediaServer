import { Types } from 'mongoose'
import { Track } from './track'

export type Album = {
    userID: Types.ObjectId
    title: string
    artist: Types.ObjectId
    genre: string
    albumType: AlbumType
    audioType: AudioType
    tracks: [Track]
    coverPath: string
    albumPath: string
}

export enum AlbumType {
    ALBUM = 'album',
    SINGLE = 'single',
}

export enum AudioType {
    MUSIC = 'music',
    AUDIO_BOOK = 'audio book',
}
