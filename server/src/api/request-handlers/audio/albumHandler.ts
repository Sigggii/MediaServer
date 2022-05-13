import { Context } from 'koa'

import { ParamValidator } from '../../middleware/shared/param-validator/param-validator'
import { createAlbumRequestValidation } from '../paramValidators/audio/albumRequestValidators'
import { JPEG } from '../../../shared/utils/file_types/images/JPEG'
import { validateFile } from '../paramValidators/FileValidators'
import {
    isOK,
    unwrapResult,
} from '../../../shared/utils/error_handling/result/result_helper'
import { handleResultError } from '../../utils/handleResultError'
import {
    CreateAlbumParamRequest,
    CreateAlbumParamRequestWithoutImage,
} from '../../../service/audio/interfaces/params/albumParams'
import { AlbumService } from '../../../service/audio/albumService'

export const handleCreateAlbum = async (ctx: Context) => {
    const albumDataWithoutImage: CreateAlbumParamRequestWithoutImage =
        ParamValidator.validateParams(
            createAlbumRequestValidation,
            JSON.parse(ctx.request.body.album)
        )

    const jpegResult = JPEG.create(
        validateFile(ctx.files ? ctx.files['coverImage'] : undefined)
    )

    if (isOK(jpegResult)) {
        const albumData: CreateAlbumParamRequest = {
            album: albumDataWithoutImage,
            coverImage: unwrapResult(jpegResult),
        }
        await AlbumService.createAlbum(
            albumData,
            ctx.cookies.get('authCookie')!
        )
        ctx.status = 201
    } else {
        handleResultError(unwrapResult(jpegResult), ctx)
    }
}
