import JPEG from '../../../../shared/utils/file_types/images/JPEG'
import { IAlbumCreateParams } from '../../../../models/audio/interfaces/mongo/album'
import { IAddTrackParams } from '../../../../models/audio/interfaces/mongo/tracks'
import FLAC from '../../../../shared/utils/file_types/audio/FLAC'

export type ICreateAlbumParamRequestWithoutImage = Omit<
    IAlbumCreateParams,
    'userID'
>

export type ICreateAlbumParamRequest = {
    album: ICreateAlbumParamRequestWithoutImage
} & { coverImage: JPEG }

export type IAddTrackParamRequestWithoutImage = Omit<
    IAddTrackParams,
    'fileLength' | 'releaseDate'
> & { releaseDate: string }

export type IAddTrackParamRequest = {
    track: IAddTrackParams
} & {
    audioFile: FLAC
}
