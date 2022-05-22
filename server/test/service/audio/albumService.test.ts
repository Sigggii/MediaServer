import { createAlbumWithoutCoverPathMock } from '../../testUtilities/mocks/models/audio/entities/albumMocks'
import {
    createAddCoverImagePathSpy,
    createAddTrackFilePathSpy,
    createAddTrackOkSpy,
    createCreateAlbumErrorSpy,
    createCreateAlbumOkSpy,
    createGetAlbumOkSpy,
} from '../../testUtilities/mocks/models/audio/repositories/albumRepositoryMocks'
import {
    createStoreAlbumCoverSpy,
    createStoreAudioFileSpy,
} from '../../testUtilities/mocks/storage/audioStorageMocks'
import AlbumService from '../../../src/service/audio/albumService'
import {
    isErr,
    isOK,
} from '../../../src/shared/utils/error_handling/result/result_helper'
import { IArtistDoesNotExistError } from '../../../src/models/audio/interfaces/results/artistResults'
import createCreateAlbumParamRequestMock from '../../testUtilities/mocks/service/audio/params/albumParamMocks'
import getMockID from '../../testUtilities/utils/modelID'
import createTrackWithoutPathMock from '../../testUtilities/mocks/models/audio/entities/trackMocks'
import { createValidFlac } from '../../testUtilities/testData/shared/file_typesTestData'
import setupDotEnv from '../../testUtilities/setup/dotEnvSetup'

describe('AlbumService Test', () => {
    const realEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...realEnv }
        setupDotEnv()
    })

    afterAll(() => {
        process.env = realEnv
    })

    describe('createAlbum', () => {
        it('handles valid Input correctly', async () => {
            const albumMock = createAlbumWithoutCoverPathMock()
            const createAlbumSpy = createCreateAlbumOkSpy(albumMock)
            const addCoverImagePathSpy = createAddCoverImagePathSpy()
            const storeAlbumCoverSpy = createStoreAlbumCoverSpy('StonePath')
            const userID = getMockID()
            const createAlbumParamRequest = createCreateAlbumParamRequestMock()
            const createAlbumResult = await AlbumService.createAlbum(
                createAlbumParamRequest,
                userID
            )

            expect(isOK(createAlbumResult)).toBeTruthy()
            expect(createAlbumResult.ok).toStrictEqual(albumMock)
            expect(createAlbumSpy).toHaveBeenCalledTimes(1)
            expect(addCoverImagePathSpy).toHaveBeenCalledTimes(1)
            expect(addCoverImagePathSpy).toHaveBeenCalledWith(
                albumMock._id,
                'StonePath'
            )
            expect(storeAlbumCoverSpy).toHaveBeenCalledTimes(1)
            expect(storeAlbumCoverSpy).toHaveBeenCalledWith(
                userID,
                albumMock.artistID,
                albumMock._id,
                createAlbumParamRequest.coverImage
            )
        })

        it('returns Error if Artist does not exist ', async () => {
            const error: IArtistDoesNotExistError = {
                sendable: true,
                type: 'Artist Error',
                message: 'Artist does not exist',
            }
            createCreateAlbumErrorSpy(error)
            const createAlbumParamRequest = createCreateAlbumParamRequestMock()
            const userID = getMockID()
            const createAlbumResult = await AlbumService.createAlbum(
                createAlbumParamRequest,
                userID
            )

            expect(isErr(createAlbumResult)).toBeTruthy()
        })
    })

    describe('addTrack', () => {
        it('handles valid Input correctly', async () => {
            const track = createTrackWithoutPathMock()
            const addTrackSpy = createAddTrackOkSpy(track)
            const getAlbumSpy = createGetAlbumOkSpy(
                createAlbumWithoutCoverPathMock()
            )
            const storeAudioFileSpy = createStoreAudioFileSpy('GravelPath')
            const addTrackFilePathSpy = createAddTrackFilePathSpy()
            const userID = getMockID()
            const flac = createValidFlac()
            const addTrackResult = await AlbumService.addTrack(
                {
                    track,
                    audioFile: flac,
                },
                userID
            )

            expect(isOK(addTrackResult)).toBeTruthy()
            expect(addTrackResult.ok).toStrictEqual(track)
            expect(addTrackSpy).toHaveBeenCalledTimes(1)
            expect(getAlbumSpy).toHaveBeenCalledTimes(1)
            expect(storeAudioFileSpy).toHaveBeenCalledTimes(1)
            expect(addTrackFilePathSpy).toHaveBeenCalledTimes(1)
        })
    })
})
