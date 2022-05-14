import { Types } from 'mongoose'
import { ITrack } from './tracks'

export type IAlbumWithoutID = {
    userID: Types.ObjectId | string
    title: string
    artistID: Types.ObjectId | string
    genre: string
    albumType: AlbumType
    audioType: AudioType
    tracks: ITrack
    coverPath: string
}

export type IAlbum = { _id: Types.ObjectId | string } & IAlbumWithoutID

export type IAlbumCreateParams = Omit<IAlbumWithoutID, 'tracks' | 'coverPath'>

export enum AlbumType {
    ALBUM = 'album',
    SINGLE = 'single',
}

export enum AudioType {
    MUSIC = 'music',
    AUDIO_BOOK = 'audio book',
}
