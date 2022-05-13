import { AlbumQueries } from '../queries/albumQueries'
import { AlbumCreateParams } from '../../interfaces/mongo/album'
import { Types } from 'mongoose'

const createAlbum = async (album: AlbumCreateParams) => {
    return AlbumQueries.createAlbum(album)
}

const addCoverImagePath = async (id: string | Types.ObjectId, path: string) => {
    return AlbumQueries.addAlbumCoverPath(id, path)
}

export const AlbumRepository = {
    createAlbum: createAlbum,
    addCoverImagePath: addCoverImagePath,
}
