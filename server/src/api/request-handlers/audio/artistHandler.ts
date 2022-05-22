import { Context } from 'koa'
import {
    ICreateArtistParamRequestWithoutImage,
    ICreateArtistParamsRequest,
} from '../../../service/audio/interfaces/params/artistParams'
import ParamValidator from '../../middleware/shared/param-validator/param-validator'
import createArtistRequestValidation from '../paramValidators/audio/artistRequestValidators'
import JPEG from '../../../shared/utils/file_types/images/JPEG'
import validateFile from '../paramValidators/shared/FileValidators'
import {
    isOK,
    unwrapResult,
} from '../../../shared/utils/error_handling/result/result_helper'
import ArtistService from '../../../service/audio/artistService'
import handleResultError from '../../utils/handleResultError'

const handleCreateArtist = async (ctx: Context) => {
    const artistWithoutImage: ICreateArtistParamRequestWithoutImage =
        ParamValidator.validateParams(
            createArtistRequestValidation,
            JSON.parse(ctx.request.body.artist)
        )

    const { buffer } = validateFile(
        ctx.files && 'artistImage' in ctx.files
            ? ctx.files.artistImage
            : undefined
    )

    const jpegResult = JPEG.create(buffer)

    if (isOK(jpegResult)) {
        const artistData: ICreateArtistParamsRequest = {
            artist: artistWithoutImage,
            artistImage: unwrapResult(jpegResult),
        }

        const createdArtist = await ArtistService.createArtist(
            artistData,
            ctx.request.userID
        )

        ctx.status = 201
        ctx.body = createdArtist
    } else {
        handleResultError(unwrapResult(jpegResult), ctx)
    }
}

export default handleCreateArtist
