import { IAlbumWithoutCoverPath } from '../../../../../../src/models/audio/interfaces/mongo/album'
import AlbumRepository from '../../../../../../src/models/audio/mongo/repositories/albumRepository'
import spyOn = jest.spyOn
import {
    makeErr,
    makeOk,
} from '../../../../../../src/shared/utils/error_handling/result/result_helper'
import { IArtistDoesNotExistError } from '../../../../../../src/models/audio/interfaces/results/artistResults'
import { ITrackWithoutPath } from '../../../../../../src/models/audio/interfaces/mongo/tracks'
import { IAlbumDoesNotExistError } from '../../../../../../src/models/audio/interfaces/results/albumResults'

export const createCreateAlbumOkSpy = (returnValue: IAlbumWithoutCoverPath) =>
    spyOn(AlbumRepository, 'createAlbum').mockResolvedValue(makeOk(returnValue))

export const createCreateAlbumErrorSpy = (
    returnValue: IArtistDoesNotExistError
) =>
    spyOn(AlbumRepository, 'createAlbum').mockResolvedValue(
        makeErr(returnValue)
    )

export const createAddCoverImagePathSpy = () =>
    spyOn(AlbumRepository, 'addCoverImagePath').mockResolvedValue()

export const createAddTrackOkSpy = (track: ITrackWithoutPath) =>
    spyOn(AlbumRepository, 'addTrack').mockResolvedValue(makeOk(track))

export const createAddTrackErrorSpy = (err: IAlbumDoesNotExistError) =>
    spyOn(AlbumRepository, 'addTrack').mockResolvedValue(makeErr(err))

export const createGetAlbumOkSpy = (album: IAlbumWithoutCoverPath) =>
    spyOn(AlbumRepository, 'getAlbum').mockResolvedValue(makeOk(album))

export const createGetAlbumErrorSpy = (err: IAlbumDoesNotExistError) =>
    spyOn(AlbumRepository, 'getAlbum').mockResolvedValue(makeErr(err))

export const createAddTrackFilePathSpy = () =>
    spyOn(AlbumRepository, 'addTrackFilePath').mockResolvedValue()
