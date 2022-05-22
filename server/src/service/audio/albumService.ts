import {
    IAddTrackParamRequest,
    ICreateAlbumParamRequest,
} from './interfaces/params/albumParams'
import AlbumRepository from '../../models/audio/mongo/repositories/albumRepository'
import AudioStorage from '../../storage/audio/audioStorage'
import {
    isErr,
    makeOk,
    unwrapResult,
} from '../../shared/utils/error_handling/result/result_helper'
import {
    IAddTrackResult,
    ICreateAlbumResult,
} from '../../models/audio/interfaces/results/albumResults'

const createAlbum = async (
    album: ICreateAlbumParamRequest,
    userID: string
): ICreateAlbumResult => {
    const createAlbumResult = await AlbumRepository.createAlbum({
        userID,
        ...album.album,
    })

    if (isErr(createAlbumResult)) return createAlbumResult
    const { _id, artistID } = unwrapResult(createAlbumResult)

    const path = await AudioStorage.storeAlbumCover(
        userID,
        artistID.toString(),
        _id.toString(),
        album.coverImage
    )
    await AlbumRepository.addCoverImagePath(_id, path)
    return createAlbumResult
}

const addTrack = async (
    track: IAddTrackParamRequest,
    userID: string
): IAddTrackResult => {
    const addTrackResult = await AlbumRepository.addTrack(track.track)
    if (isErr(addTrackResult)) return addTrackResult
    const getalbumResult = await AlbumRepository.getAlbum(track.track.albumID)
    if (isErr(getalbumResult)) return getalbumResult
    const addedTrack = unwrapResult(addTrackResult)
    const album = unwrapResult(getalbumResult)
    const filePath = await AudioStorage.storeAudioFile({
        userID,
        trackID: addedTrack._id.toString(),
        artistID: album.artistID.toString(),
        albumID: album._id.toString(),
        audio: track.audioFile,
    })
    await AlbumRepository.addTrackFilePath(album._id, addedTrack._id, filePath)
    return makeOk(addedTrack)
}

const AlbumService = {
    createAlbum,
    addTrack,
}

export default AlbumService
