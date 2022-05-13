import { Album, AlbumCreateParams } from '../../interfaces/mongo/album'
import { AlbumModel } from '../schema/albumSchema'
import { Types } from 'mongoose'

const createAlbum = async (album: AlbumCreateParams): Promise<Album> => {
    const albumModel = new AlbumModel(album)
    return await albumModel.save()
}

const addAlbumCoverPath = async (id: string | Types.ObjectId, path: string) => {
    const album = await AlbumModel.findById(id)
    if (album) {
        album.coverPath = path
        await album.save()
    }
}

export const AlbumQueries = {
    createAlbum: createAlbum,
    addAlbumCoverPath: addAlbumCoverPath,
}
