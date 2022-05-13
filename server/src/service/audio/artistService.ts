import { CreateArtistParamsRequest } from './interfaces/params/artistParams'
import { JWTManager } from '../shared/auth/jwtManager'
import { UnAuthorizedError } from '../../api/middleware/shared/authMiddleware'
import { ArtistRepository } from '../../models/audio/mongo/repositories/artistRepository'
import { AudioStorage } from '../../storage/audio/audioStorage'

const createArtist = async (
    artist: CreateArtistParamsRequest,
    idToken: string
) => {
    const tokenResult = await JWTManager.verifyToken(idToken)
    if (!tokenResult.isValid) throw UnAuthorizedError

    const { _id, name } = await ArtistRepository.createArtist(artist.artist)

    const path = await AudioStorage.storeArtistImage(
        _id.toString(),
        name,
        artist.artistImage
    )

    await ArtistRepository.addImagePath(_id, path)
}

export const ArtistService = {
    createArtist: createArtist,
}
