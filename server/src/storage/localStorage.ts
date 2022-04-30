import { writeFile, readFile, existsSync } from 'fs'

import {
    DoesFileExist,
    ReadFromStorage,
    Storage,
    WriteToStorage,
} from './interfaces/storage'
import { DotEnvManager } from '../base/envVariableManager/dotEnvManager'

const storagePath = DotEnvManager.getEnvVariable('STORAGE_PATH')

const getFullPath = (filepath: string) => storagePath + filepath

const createCallbackFunction =
    (onError: () => void, onSuccess?: () => void) => (err) => {
        if (err) {
            return onError()
        }
        if (onSuccess) {
            onSuccess()
        }
    }

const writeToStorage: WriteToStorage = (
    filepath: string,
    fileToSave: Buffer,
    onError: () => void,
    onSuccess?: () => void
) => {
    writeFile(
        getFullPath(filepath),
        fileToSave,
        { flag: 'wx' },
        createCallbackFunction(onError, onSuccess)
    )
}

const readFromStorage: ReadFromStorage = (
    filepath: string,
    onError,
    onSuccess: () => void
) => {
    readFile(getFullPath(filepath), createCallbackFunction(onError, onSuccess))
}

const doesFileExist: DoesFileExist = (filepath: string) => {
    return existsSync(getFullPath(filepath))
}

export const LocalStorage: Storage = {
    writeToStorage,
    readFromStorage,
    doesFileExist,
}
