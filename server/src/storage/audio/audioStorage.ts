import LocalStorage from '../localStorage'
import logger from '../../base/logging/logger'
import JPEG from '../../shared/utils/file_types/images/JPEG'
import FLAC from '../../shared/utils/file_types/audio/FLAC'
import {
    createAlbumCoverPath,
    createArtistImagePath,
    createTrackPath,
} from '../storagePathCreators'

const storeAlbumCover = async (
    userID: string,
    artistID: string,
    albumID: string,
    jpeg: JPEG
) => {
    const coverPath = createAlbumCoverPath(userID, artistID, albumID)
    logger.info(
        `AudioStorage#storeAlbumCover: Save AlbumCover  (Path: ${coverPath})`
    )
    await LocalStorage.writeToStorage(coverPath, jpeg.getData)
    return coverPath
}

type StoreAudioFileParams = {
    userID: string
    artistID: string
    albumID: string
    trackID: string
    audio: FLAC
}

const storeAudioFile = async (storeAudioFileParams: StoreAudioFileParams) => {
    const { userID, artistID, albumID, trackID, audio } = storeAudioFileParams
    const trackPath = createTrackPath(userID, artistID, albumID, trackID)

    logger.info(
        `AudioStorage#storeAudioFile: Save AudioFile  (Path: ${trackPath})`
    )
    await LocalStorage.writeToStorage(trackPath, audio.getData())
    return trackPath
}

const storeArtistImage = async (
    userID: string,
    artistID: string,
    jpeg: JPEG
) => {
    const imagePath = createArtistImagePath(userID, artistID)
    logger.info(
        `AudioStorage#storeArtistImage: Save ArtistImage  (Path: ${imagePath})`
    )

    await LocalStorage.writeToStorage(imagePath, jpeg.getData)
    return imagePath
}

const AudioStorage = {
    storeAlbumCover,
    storeArtistImage,
    storeAudioFile,
}

export default AudioStorage
