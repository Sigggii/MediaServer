import { ICreateArtistParamsRequest } from './interfaces/params/artistParams'
import ArtistRepository from '../../models/audio/mongo/repositories/artistRepository'
import AudioStorage from '../../storage/audio/audioStorage'

const createArtist = async (
    artist: ICreateArtistParamsRequest,
    userID: string
) => {
    const { _id } = await ArtistRepository.createArtist({
        user: userID,
        ...artist.artist,
    })

    const path = await AudioStorage.storeArtistImage(
        userID,
        _id.toString(),
        artist.artistImage
    )

    await ArtistRepository.addImagePath(_id, path)
}

const ArtistService = {
    createArtist,
}

export default ArtistService
