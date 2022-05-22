import { ITrackWithoutPath } from '../../../../../../src/models/audio/interfaces/mongo/tracks'
import getMockID from '../../../../utils/modelID'

const createTrackWithoutPathMock = (): ITrackWithoutPath => ({
    _id: getMockID(),
    title: 'Field of Blood',
    albumID: getMockID(),
    fileLength: 12331233,
    releaseDate: new Date(2022, 1, 12),
    genre: 'Dark Rock',
    titleNumber: 6,
    features: [],
})
export default createTrackWithoutPathMock
