import LocalStorage from '../localStorage'
import logger from '../../base/logging/logger'
import JPEG from '../../shared/utils/file_types/images/JPEG'

const audioStoragePath = 'audio/'
const audioAlbumPath = `${audioStoragePath}albums/`
const audioArtistPath = `${audioStoragePath}artists/`

const storeAlbumCover = async (
    albumID: string,
    albumName: string,
    jpeg: JPEG
) => {
    const coverPath = `${
        audioAlbumPath + albumID
    }_${albumName}/cover_${albumID}.jpg`
    logger.info(
        `${'AudioStorage#storeAlbumCover: Speichere AlbumCover  (Pfad: '}${coverPath})`
    )
    await LocalStorage.writeToStorage(coverPath, jpeg.getData)
    return coverPath
}

const storeArtistImage = async (
    artistID: string,
    artistName: string,
    jpeg: JPEG
) => {
    const imagePath = `${
        audioArtistPath + artistID
    }_${artistName}/image_${artistID}.jpg`

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
