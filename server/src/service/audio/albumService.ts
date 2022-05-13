import { CreateAlbumParamRequest } from './interfaces/params/albumParams'
import { AlbumRepository } from '../../models/audio/mongo/repositories/albumRepository'
import { JWTManager } from '../shared/auth/jwtManager'
import { UnAuthorizedError } from '../../api/middleware/shared/authMiddleware'
import { AudioStorage } from '../../storage/audio/audioStorage'

const createAlbum = async (album: CreateAlbumParamRequest, idToken: string) => {
    const tokenResult = await JWTManager.verifyToken(idToken)
    if (!tokenResult.isValid) throw UnAuthorizedError

    const { _id, title } = await AlbumRepository.createAlbum({
        userID: tokenResult.authUserInfo.userID,
        ...album.album,
    })

    const path = await AudioStorage.storeAlbumCover(
        _id.toString(),
        title,
        album.coverImage
    )
    await AlbumRepository.addCoverImagePath(_id, path)
}

export const AlbumService = {
    createAlbum: createAlbum,
}
