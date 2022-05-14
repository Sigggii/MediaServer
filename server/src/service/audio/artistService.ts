import { ICreateArtistParamsRequest } from './interfaces/params/artistParams'
import ArtistRepository from '../../models/audio/mongo/repositories/artistRepository'
import AudioStorage from '../../storage/audio/audioStorage'

const createArtist = async (artist: ICreateArtistParamsRequest) => {
    const { _id, name } = await ArtistRepository.createArtist(artist.artist)

    const path = await AudioStorage.storeArtistImage(
        _id.toString(),
        name,
        artist.artistImage
    )

    await ArtistRepository.addImagePath(_id, path)
}

const ArtistService = {
    createArtist,
}

export default ArtistService
