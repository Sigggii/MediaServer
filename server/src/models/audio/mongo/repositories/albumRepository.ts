import { Types } from 'mongoose'
import AlbumQueries from '../queries/albumQueries'
import { IAlbumCreateParams } from '../../interfaces/mongo/album'

const createAlbum = async (album: IAlbumCreateParams) =>
    AlbumQueries.createAlbum(album)

const addCoverImagePath = async (id: string | Types.ObjectId, path: string) =>
    AlbumQueries.addAlbumCoverPath(id, path)

const AlbumRepository = {
    createAlbum,
    addCoverImagePath,
}

export default AlbumRepository
