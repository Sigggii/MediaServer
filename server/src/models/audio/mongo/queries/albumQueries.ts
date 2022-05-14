import { Types } from 'mongoose'
import { IAlbum, IAlbumCreateParams } from '../../interfaces/mongo/album'
import AlbumModel from '../schema/albumSchema'

const createAlbum = async (album: IAlbumCreateParams): Promise<IAlbum> => {
    const albumModel = new AlbumModel(album)
    return albumModel.save()
}

const addAlbumCoverPath = async (id: string | Types.ObjectId, path: string) => {
    const album = await AlbumModel.findById(id)
    if (album) {
        album.coverPath = path
        await album.save()
    }
}

const AlbumQueries = {
    createAlbum,
    addAlbumCoverPath,
}

export default AlbumQueries
