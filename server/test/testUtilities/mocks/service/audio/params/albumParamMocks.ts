import { ICreateAlbumParamRequest } from '../../../../../../src/service/audio/interfaces/params/albumParams'
import getMockID from '../../../../utils/modelID'
import {
    AlbumType,
    AudioType,
} from '../../../../../../src/models/audio/interfaces/mongo/album'
import { createValidJpeg } from '../../../../testData/shared/file_typesTestData'

const createCreateAlbumParamRequestMock = (): ICreateAlbumParamRequest => ({
    album: {
        title: 'Thornstar',
        artistID: getMockID(),
        albumType: AlbumType.ALBUM,
        audioType: AudioType.MUSIC,
        genre: 'Dark Rock',
    },
    coverImage: createValidJpeg(),
})

export default createCreateAlbumParamRequestMock
