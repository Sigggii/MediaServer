// Shared
export const createUserPath = (userID: string) => `user_${userID}/`

// Audio
export const createAudioPath = (userID: string) =>
    `${createUserPath(userID)}audio/`

export const createArtistPath = (userID: string, artistID: string) =>
    `${createAudioPath(userID)}artist_${artistID}/`

export const createArtistImagePath = (userID: string, artistID: string) =>
    `${createArtistPath(userID, artistID)}artist_image.jpg`

export const createAlbumPath = (
    userID: string,
    artistID: string,
    albumID: string
) => `${createArtistPath(userID, artistID)}albums/album_${albumID}/`

export const createAlbumCoverPath = (
    userID: string,
    artistID: string,
    albumID: string
) => `${createAlbumPath(userID, artistID, albumID)}cover.jpg`

export const createTrackPath = (
    userID: string,
    artistID: string,
    albumID: string,
    trackID: string
) => `${createAlbumPath(userID, artistID, albumID)}track_${trackID}.flac`
