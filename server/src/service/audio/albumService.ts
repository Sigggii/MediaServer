import { ICreateAlbumParamRequest } from './interfaces/params/albumParams'
import AlbumRepository from '../../models/audio/mongo/repositories/albumRepository'
import AudioStorage from '../../storage/audio/audioStorage'

const createAlbum = async (album: ICreateAlbumParamRequest, userID: string) => {
    const { _id, title } = await AlbumRepository.createAlbum({
        userID,
        ...album.album,
    })

    const path = await AudioStorage.storeAlbumCover(
        _id.toString(),
        title,
        album.coverImage
    )
    await AlbumRepository.addCoverImagePath(_id, path)
}

const AlbumService = {
    createAlbum,
}

export default AlbumService
