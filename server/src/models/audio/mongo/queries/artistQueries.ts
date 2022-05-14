import { ICreateArtistParams } from '../../interfaces/mongo/artist'
import ArtistModel from '../schema/artistSchema'

import { ID } from '../../../interfaces'

const createArtist = async (artist: ICreateArtistParams) =>
    new ArtistModel(artist).save()

const addImagePath = async (artistID: ID, imagePath: string) => {
    const artist = await ArtistModel.findById(artistID)
    if (artist) {
        artist.imagePath = imagePath
        await artist.save()
    }
}

const ArtistQueries = {
    createArtist,
    addImagePath,
}

export default ArtistQueries
