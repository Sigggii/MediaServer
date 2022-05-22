import { Document, Types } from 'mongoose'

import {
    IAlbumCreateParams,
    IAlbumWithoutCoverPath,
    IAlbumWithoutID,
    IAlbumWithoutTrackPath,
} from '../../interfaces/mongo/album'
import AlbumModel from '../schema/albumSchema'
import { ID } from '../../../interfaces'
import { IAddTrackParams } from '../../interfaces/mongo/tracks'
import {
    makeErr,
    makeOk,
} from '../../../../shared/utils/error_handling/result/result_helper'
import { AlbumDoesNotExistError } from '../../results/albumResults'
import {
    IAddTrackResult,
    IGetAlbumResult,
} from '../../interfaces/results/albumResults'

const createAlbum = async (
    album: IAlbumCreateParams
): Promise<IAlbumWithoutCoverPath> => {
    const albumModel = new AlbumModel(album)
    return albumModel.save()
}

const addAlbumCoverPath = async (id: ID, path: string) => {
    const album = await AlbumModel.findById(id)
    if (album) {
        album.coverPath = path
        await album.save()
    }
}

type DocumentAlbumWithTracksWithoutPath =
    | (Document<unknown, unknown, IAlbumWithoutID> & IAlbumWithoutTrackPath)
    | null

const addTrack = async (track: IAddTrackParams): IAddTrackResult => {
    const album: DocumentAlbumWithTracksWithoutPath = await AlbumModel.findById(
        track.albumID
    )
    if (album) {
        album.tracks.push({ _id: new Types.ObjectId(), ...track })
        const savedAlbum = await album.save()
        return makeOk(savedAlbum.tracks[savedAlbum.tracks.length - 1])
    }
    return makeErr(AlbumDoesNotExistError)
}

const addTrackFilePath = async (albumID: ID, trackID: ID, filePath: string) => {
    await AlbumModel.findOneAndUpdate(
        { _id: albumID, 'tracks._id': trackID },
        {
            $set: {
                'tracks.$.filePath': filePath,
            },
        }
    )
}

const doesAlbumExist = async (albumID: ID): Promise<boolean> => {
    const result = await AlbumModel.exists({ _id: albumID })
    return !!result
}

const getAlbum = async (albumID: ID): IGetAlbumResult => {
    const album = await AlbumModel.findById(albumID)
    if (!album) return makeErr(AlbumDoesNotExistError)
    return makeOk(album)
}

const AlbumQueries = {
    createAlbum,
    addAlbumCoverPath,
    addTrack,
    addTrackFilePath,
    doesAlbumExist,
    getAlbum,
}

export default AlbumQueries
