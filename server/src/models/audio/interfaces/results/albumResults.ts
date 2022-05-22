import { ResultErrorTypeCreator } from '../../../../shared/interfaces/utils/error_handling/resultError'
import { Result } from '../../../../shared/interfaces/utils/error_handling/result'
import { ITrackWithoutPath } from '../mongo/tracks'
import { IAlbumWithoutCoverPath } from '../mongo/album'
import { IArtistDoesNotExistError } from './artistResults'

type IAlbumErrorTypeCreator<
    SENDABLE extends boolean,
    MESSAGE extends string | string[]
> = ResultErrorTypeCreator<SENDABLE, 'Album Error', MESSAGE>

export type IAlbumDoesNotExistError = IAlbumErrorTypeCreator<
    true,
    'Album does not exist'
>

export type IAddTrackResult = Promise<
    Result<ITrackWithoutPath, IAlbumDoesNotExistError>
>

export type IGetAlbumResult = Promise<
    Result<IAlbumWithoutCoverPath, IAlbumDoesNotExistError>
>

export type ICreateAlbumResult = Promise<
    Result<IAlbumWithoutCoverPath, IArtistDoesNotExistError>
>
