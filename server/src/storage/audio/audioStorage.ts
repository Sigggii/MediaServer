import LocalStorage from '../localStorage'
import logger from '../../base/logging/logger'
import JPEG from '../../shared/utils/file_types/images/JPEG'

const createAudioPath = (userID: string) => `${userID}/audio/`
const createArtistPath = (userID: string, artistID: string) =>
    `${createAudioPath(userID) + artistID}/`
const createAlbumPath = (
    userID: string,
    artistID: string,
    albumID: string,
    albumName: string
) => `${createArtistPath(userID, artistID)} ${albumID}_${albumName}/`

const storeAlbumCover = async (
    userID: string,
    artistID: string,
    albumID: string,
    albumName: string,
    jpeg: JPEG
) => {
    const coverPath = `${createAlbumPath(
        userID,
        artistID,
        albumID,
        albumName
    )}cover_${albumID}.jpg`
    logger.info(
        `${'AudioStorage#storeAlbumCover: Speichere AlbumCover  (Pfad: '}${coverPath})`
    )
    await LocalStorage.writeToStorage(coverPath, jpeg.getData)
    return coverPath
}

const storeArtistImage = async (
    userID: string,
    artistID: string,
    jpeg: JPEG
) => {
    const imagePath = `${createArtistPath(
        userID,
        artistID
    )}image_${artistID}.jpg`
    logger.info(
        `${'AudioStorage#storeArtistImage: Speichere ArtistImage  (Pfad: '}${imagePath})`
    )

    await LocalStorage.writeToStorage(imagePath, jpeg.getData)
    return imagePath
}

const AudioStorage = {
    storeAlbumCover,
    storeArtistImage,
}

export default AudioStorage
