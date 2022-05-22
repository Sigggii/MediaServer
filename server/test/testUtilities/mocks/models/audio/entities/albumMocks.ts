import { createMock } from 'ts-auto-mock'
import {
    AlbumType,
    AudioType,
    IAlbum,
    IAlbumWithoutCoverPath,
} from '../../../../../../src/models/audio/interfaces/mongo/album'
import getMockID from '../../../../utils/modelID'

export const createAlbumMock = () => createMock<IAlbum>()

export const createAlbumWithoutCoverPathMock = (): IAlbumWithoutCoverPath => ({
    _id: getMockID(),
    userID: getMockID(),
    title: 'Pleasure to Kill',
    artistID: getMockID(),
    albumType: AlbumType.ALBUM,
    audioType: AudioType.MUSIC,
    genre: 'Metal',
    tracks: [],
})
