import { ICreateArtistParams } from '../../interfaces/mongo/artist'
import ArtistQueries from '../queries/artistQueries'
import { ID } from '../../../interfaces'

const createArtist = async (artist: ICreateArtistParams) =>
    ArtistQueries.createArtist(artist)

const addImagePath = async (id: ID, imagePath: string) => {
    await ArtistQueries.addImagePath(id, imagePath)
}

const ArtistRepository = {
    createArtist,
    addImagePath,
}

export default ArtistRepository
