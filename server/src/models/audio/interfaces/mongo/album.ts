import { Types } from 'mongoose'
import { Track } from './track'
import { MakeFieldPartial } from '../../../../shared/utils/advanced_types/makeFieldPartial'

export type AlbumWithoutID = {
    userID: Types.ObjectId | string
    title: string
    artistID: Types.ObjectId | string
    genre: string
    albumType: AlbumType
    audioType: AudioType
    tracks: Track
    coverPath: string
}

export type Album = { _id: Types.ObjectId | string } & AlbumWithoutID

export type AlbumCreateParams = Omit<AlbumWithoutID, 'tracks' | 'coverPath'>

export enum AlbumType {
    ALBUM = 'album',
    SINGLE = 'single',
}

export enum AudioType {
    MUSIC = 'music',
    AUDIO_BOOK = 'audio book',
}
