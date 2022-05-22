import spyOn = jest.spyOn
import AudioStorage from '../../../../src/storage/audio/audioStorage'

export const createStoreAlbumCoverSpy = (coverPath: string) =>
    spyOn(AudioStorage, 'storeAlbumCover').mockResolvedValue(coverPath)

export const createStoreAudioFileSpy = (audioFilePath: string) =>
    spyOn(AudioStorage, 'storeAudioFile').mockResolvedValue(audioFilePath)
