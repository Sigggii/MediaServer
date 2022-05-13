import { CreateArtistParams } from '../../interfaces/mongo/artist'
import { ArtistQueries } from '../queries/artistQueries'
import { ID } from '../../../interfaces'

const createArtist = async (artist: CreateArtistParams) => {
    return await ArtistQueries.createArtist(artist)
}

const addImagePath = async (id: ID, imagePath: string) => {
    await ArtistQueries.addImagePath(id, imagePath)
}

export const ArtistRepository = {
    createArtist: createArtist,
    addImagePath: addImagePath,
}
