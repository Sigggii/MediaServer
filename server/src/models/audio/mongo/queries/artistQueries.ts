import {
    ArtistWithoutID,
    CreateArtistParams,
} from '../../interfaces/mongo/artist'
import { ArtistModel } from '../schema/artistSchema'
import { Types } from 'mongoose'
import { add } from 'winston'
import { ID } from '../../../interfaces'

const createArtist = async (artist: CreateArtistParams) => {
    return new ArtistModel(artist).save()
}

const addImagePath = async (artistID: ID, imagePath: string) => {
    const artist = await ArtistModel.findById(artistID)
    if (artist) {
        artist.imagePath = imagePath
        await artist.save()
    }
}

export const ArtistQueries = {
    createArtist: createArtist,
    addImagePath: addImagePath,
}
