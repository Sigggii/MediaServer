import {
    IArtistWithoutImagePath,
    ICreateArtistParams,
} from '../../interfaces/mongo/artist'
import ArtistModel from '../schema/artistSchema'

import { ID } from '../../../interfaces'

const createArtist = async (
    artist: ICreateArtistParams
): Promise<IArtistWithoutImagePath> => new ArtistModel(artist).save()

const addImagePath = async (artistID: ID, imagePath: string) => {
    const artist = await ArtistModel.findById(artistID)
    if (artist) {
        artist.imagePath = imagePath
        await artist.save()
    }
}

const doesArtistExist = async (artistID: ID): Promise<boolean> => {
    const result = await ArtistModel.exists({ _id: artistID })
    return !!result
}

const ArtistQueries = {
    createArtist,
    addImagePath,
    doesArtistExist,
}

export default ArtistQueries
