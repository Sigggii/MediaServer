import JPEG from '../../../../src/shared/utils/file_types/images/JPEG'
import {
    isErr,
    unwrapResult,
} from '../../../../src/shared/utils/error_handling/result/result_helper'
import FLAC from '../../../../src/shared/utils/file_types/audio/FLAC'

export const createValidJpeg = () => {
    const jpegResult = JPEG.create(Buffer.from('ffd8ff', 'hex'))
    if (isErr(jpegResult))
        throw new Error(
            'Plz fix this testData Function, createValidJpeg doesnt produces valid JPEG anymore'
        )
    return unwrapResult(jpegResult)
}

export const createValidFlac = () => {
    const flacResult = FLAC.create(Buffer.from('664c6143', 'hex'))
    if (isErr(flacResult))
        throw new Error(
            'Plz fix this testData Function, createValidFlac doesnt produces valid Flac anymore'
        )

    return unwrapResult(flacResult)
}
