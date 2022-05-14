import JPEG from '../../../../shared/utils/file_types/images/JPEG'
import { IAlbumCreateParams } from '../../../../models/audio/interfaces/mongo/album'

export type ICreateAlbumParamRequestWithoutImage = Omit<
    IAlbumCreateParams,
    'coverPath' | 'userID'
>

export type ICreateAlbumParamRequest = {
    album: ICreateAlbumParamRequestWithoutImage
} & { coverImage: JPEG }
