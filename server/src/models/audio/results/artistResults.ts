import { IArtistDoesNotExistError } from '../interfaces/results/artistResults'

export const ArtistDoesNotExistError: IArtistDoesNotExistError = {
    sendable: true,
    type: 'Artist Error',
    message: 'Artist does not exist',
}
