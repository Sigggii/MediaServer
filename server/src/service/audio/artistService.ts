import { ICreateArtistParamsRequest } from './interfaces/params/artistParams'
import ArtistRepository from '../../models/audio/mongo/repositories/artistRepository'
import AudioStorage from '../../storage/audio/audioStorage'
import { IArtistWithoutImagePath } from '../../models/audio/interfaces/mongo/artist'

const createArtist = async (
    artist: ICreateArtistParamsRequest,
    userID: string
): Promise<IArtistWithoutImagePath> => {
    const createdArtist = await ArtistRepository.createArtist({
        userID,
        ...artist.artist,
    })

    const path = await AudioStorage.storeArtistImage(
        userID,
        createdArtist._id.toString(),
        artist.artistImage
    )

    await ArtistRepository.addImagePath(createdArtist._id, path)
    return createdArtist
}

const ArtistService = {
    createArtist,
}

export default ArtistService
