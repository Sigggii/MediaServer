import fs, { existsSync } from 'fs'

import { ReadFromStorage, Storage, WriteToStorage } from './interfaces/storage'
import { DotEnvManager } from '../base/envVariableManager/dotEnvManager'

const storagePath = DotEnvManager.getEnvVariable('STORAGE_PATH')

const fsPromises = fs.promises

const getFullPath = (filepath: string) => storagePath + filepath

const writeToStorage: WriteToStorage = async (
    filepath: string,
    fileToSave: Buffer
) => {
    const fullPath = getFullPath(filepath)
    const fileNamePositon = fullPath.lastIndexOf('/')
    if (fileNamePositon !== -1) {
        const fileDirectoryPath = fullPath.substring(0, fileNamePositon)
        await fsPromises.mkdir(fileDirectoryPath, { recursive: true })
    }

    await fsPromises.writeFile(fullPath, fileToSave)
}

const readFromStorage: ReadFromStorage = async (filepath: string) => {
    return await fsPromises.readFile(getFullPath(filepath))
}

export const LocalStorage: Storage = {
    writeToStorage,
    readFromStorage,
}
