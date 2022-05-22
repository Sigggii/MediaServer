import {
    IArtistWithoutImagePath,
    ICreateArtistParams,
} from '../../interfaces/mongo/artist'
import ArtistQueries from '../queries/artistQueries'
import { ID } from '../../../interfaces'

const createArtist = async (
    artist: ICreateArtistParams
): Promise<IArtistWithoutImagePath> => ArtistQueries.createArtist(artist)

const addImagePath = async (id: ID, imagePath: string) => {
    await ArtistQueries.addImagePath(id, imagePath)
}

const doesArtisExist = async (artistID: ID) =>
    ArtistQueries.doesArtistExist(artistID)

const ArtistRepository = {
    createArtist,
    addImagePath,
    doesArtisExist,
}

export default ArtistRepository
