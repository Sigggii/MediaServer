import { ICreateArtistParams } from '../../../../models/audio/interfaces/mongo/artist'
import JPEG from '../../../../shared/utils/file_types/images/JPEG'

export type ICreateArtistParamRequestWithoutImage = ICreateArtistParams

export type ICreateArtistParamsRequest = {
    artist: ICreateArtistParamRequestWithoutImage
} & { artistImage: JPEG }
