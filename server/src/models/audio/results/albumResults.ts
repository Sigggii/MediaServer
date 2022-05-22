import { IAlbumDoesNotExistError } from '../interfaces/results/albumResults'

export const AlbumDoesNotExistError: IAlbumDoesNotExistError = {
    sendable: true,
    type: 'Album Error',
    message: 'Album does not exist',
}
