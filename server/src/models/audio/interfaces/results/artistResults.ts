import { ResultErrorTypeCreator } from '../../../../shared/interfaces/utils/error_handling/resultError'

type IArtistErrorTypeCreator<
    SENDABLE extends boolean,
    MESSAGE extends string | string[]
> = ResultErrorTypeCreator<SENDABLE, 'Artist Error', MESSAGE>

export type IArtistDoesNotExistError = IArtistErrorTypeCreator<
    true,
    'Artist does not exist'
>
