import { Context } from 'koa'

import ParamValidator from '../../middleware/shared/param-validator/param-validator'
import {
    addTrackRequestValidation,
    createAlbumRequestValidation,
} from '../paramValidators/audio/albumRequestValidators'
import JPEG from '../../../shared/utils/file_types/images/JPEG'
import validateFile from '../paramValidators/shared/FileValidators'
import {
    handleResult,
    isOK,
    unwrapResult,
} from '../../../shared/utils/error_handling/result/result_helper'
import handleResultError from '../../utils/handleResultError'
import {
    IAddTrackParamRequest,
    IAddTrackParamRequestWithoutImage,
    ICreateAlbumParamRequest,
    ICreateAlbumParamRequestWithoutImage,
} from '../../../service/audio/interfaces/params/albumParams'
import AlbumService from '../../../service/audio/albumService'
import FLAC from '../../../shared/utils/file_types/audio/FLAC'
import dateValidator from '../paramValidators/shared/DateValidator'
import { ITrackWithoutPath } from '../../../models/audio/interfaces/mongo/tracks'
import { IAlbumDoesNotExistError } from '../../../models/audio/interfaces/results/albumResults'
import { IAlbumWithoutCoverPath } from '../../../models/audio/interfaces/mongo/album'
import { IArtistDoesNotExistError } from '../../../models/audio/interfaces/results/artistResults'

export const handleCreateAlbum = async (ctx: Context) => {
    const albumDataWithoutImage: ICreateAlbumParamRequestWithoutImage =
        ParamValidator.validateParams(
            createAlbumRequestValidation,
            JSON.parse(ctx.request.body.album)
        )

    const { buffer } = validateFile(
        ctx.files && 'coverImage' in ctx.files
            ? ctx.files.coverImage
            : undefined
    )

    const jpegResult = JPEG.create(buffer)

    if (isOK(jpegResult)) {
        const albumData: ICreateAlbumParamRequest = {
            album: albumDataWithoutImage,
            coverImage: unwrapResult(jpegResult),
        }
        const createAlbumResult = await AlbumService.createAlbum(
            albumData,
            ctx.request.userID
        )

        const handleCreateAlbumResultSuccess = (
            album: IAlbumWithoutCoverPath
        ) => {
            ctx.status = 201
            ctx.body = album
        }

        const handleCreateAlbumResultError = (
            err: IArtistDoesNotExistError
        ) => {
            handleResultError(err, ctx)
        }

        handleResult(
            createAlbumResult,
            handleCreateAlbumResultSuccess,
            handleCreateAlbumResultError
        )
    } else {
        handleResultError(unwrapResult(jpegResult), ctx)
    }
}

export const handleAddTrack = async (ctx: Context) => {
    const trackWithoutFile: IAddTrackParamRequestWithoutImage =
        ParamValidator.validateParams(
            addTrackRequestValidation,
            JSON.parse(ctx.request.body.trackInfo)
        )

    const { buffer, size } = validateFile(
        ctx.files && 'trackFile' in ctx.files ? ctx.files.trackFile : undefined
    )

    const flacResult = FLAC.create(buffer)

    if (isOK(flacResult)) {
        const trackData: IAddTrackParamRequest = {
            track: {
                ...trackWithoutFile,
                fileLength: size,
                releaseDate: dateValidator(trackWithoutFile.releaseDate),
            },
            audioFile: unwrapResult(flacResult),
        }
        const addTrackResult = await AlbumService.addTrack(
            trackData,
            ctx.request.userID
        )

        const handleAddTrackResultSuccess = (track: ITrackWithoutPath) => {
            ctx.status = 201
            ctx.body = track
        }
        const handleAddTrackResultError = (err: IAlbumDoesNotExistError) => {
            handleResultError(err, ctx)
        }

        handleResult(
            addTrackResult,
            handleAddTrackResultSuccess,
            handleAddTrackResultError
        )
    } else {
        handleResultError(unwrapResult(flacResult), ctx)
    }
}
