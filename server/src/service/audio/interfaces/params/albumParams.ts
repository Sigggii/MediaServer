import { JPEG } from '../../../../shared/utils/file_types/images/JPEG'
import { AlbumCreateParams } from '../../../../models/audio/interfaces/mongo/album'

export type CreateAlbumParamRequestWithoutImage = Omit<
    AlbumCreateParams,
    'coverPath' | 'userID'
>

export type CreateAlbumParamRequest = {
    album: CreateAlbumParamRequestWithoutImage
} & { coverImage: JPEG }
