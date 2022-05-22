import { Types } from 'mongoose'
import AlbumQueries from '../queries/albumQueries'
import { IAlbumCreateParams } from '../../interfaces/mongo/album'
import { IAddTrackParams } from '../../interfaces/mongo/tracks'
import { ID } from '../../../interfaces'
import {
    IAddTrackResult,
    ICreateAlbumResult,
    IGetAlbumResult,
} from '../../interfaces/results/albumResults'
import {
    makeErr,
    makeOk,
} from '../../../../shared/utils/error_handling/result/result_helper'
import ArtistRepository from './artistRepository'
import { ArtistDoesNotExistError } from '../../results/artistResults'

const doesAlbumExist = async (albumID: ID) =>
    AlbumQueries.doesAlbumExist(albumID)

const createAlbum = async (album: IAlbumCreateParams): ICreateAlbumResult => {
    if (!(await ArtistRepository.doesArtisExist(album.artistID)))
        return makeErr(ArtistDoesNotExistError)
    return makeOk(await AlbumQueries.createAlbum(album))
}

const addCoverImagePath = async (id: string | Types.ObjectId, path: string) =>
    AlbumQueries.addAlbumCoverPath(id, path)

const addTrack = async (track: IAddTrackParams): IAddTrackResult =>
    AlbumQueries.addTrack(track)

const addTrackFilePath = async (albumID: ID, trackID: ID, filePath: string) =>
    AlbumQueries.addTrackFilePath(albumID, trackID, filePath)

const getAlbum = async (albumID: ID): IGetAlbumResult =>
    AlbumQueries.getAlbum(albumID)

const AlbumRepository = {
    createAlbum,
    addCoverImagePath,
    addTrack,
    addTrackFilePath,
    doesAlbumExist,
    getAlbum,
}

export default AlbumRepository
