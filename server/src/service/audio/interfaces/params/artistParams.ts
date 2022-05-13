import { CreateArtistParams } from '../../../../models/audio/interfaces/mongo/artist'
import { JPEG } from '../../../../shared/utils/file_types/images/JPEG'

export type CreateArtistParamRequestWithoutImage = CreateArtistParams

export type CreateArtistParamsRequest = {
    artist: CreateArtistParamRequestWithoutImage
} & { artistImage: JPEG }
