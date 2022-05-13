import { Context } from 'koa'
import {
    CreateArtistParamRequestWithoutImage,
    CreateArtistParamsRequest,
} from '../../../service/audio/interfaces/params/artistParams'
import { ParamValidator } from '../../middleware/shared/param-validator/param-validator'
import { createArtistRequestValidation } from '../paramValidators/audio/artistRequestValidators'
import { JPEG } from '../../../shared/utils/file_types/images/JPEG'
import { validateFile } from '../paramValidators/FileValidators'
import {
    isOK,
    unwrapResult,
} from '../../../shared/utils/error_handling/result/result_helper'
import { ArtistService } from '../../../service/audio/artistService'
import { handleResultError } from '../../utils/handleResultError'

export const handleCreateArtist = async (ctx: Context) => {
    const artistWithoutImage: CreateArtistParamRequestWithoutImage =
        ParamValidator.validateParams(
            createArtistRequestValidation,
            JSON.parse(ctx.request.body.artist)
        )

    const jpegResult = JPEG.create(
        validateFile(ctx.files ? ctx.files['artistImage'] : undefined)
    )

    if (isOK(jpegResult)) {
        const artistData: CreateArtistParamsRequest = {
            artist: artistWithoutImage,
            artistImage: unwrapResult(jpegResult),
        }

        await ArtistService.createArtist(
            artistData,
            ctx.cookies.get('authCookie')!
        )

        ctx.status = 201
    } else {
        handleResultError(unwrapResult(jpegResult), ctx)
    }
}
