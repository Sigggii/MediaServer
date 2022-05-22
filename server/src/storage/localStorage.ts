import fs from 'fs'

import { ReadFromStorage, Storage, WriteToStorage } from './interfaces/storage'
import DotEnvManager from '../base/envVariableManager/dotEnvManager'

const fsPromises = fs.promises

const getFullPath = (filepath: string) =>
    DotEnvManager.getEnvVariable('STORAGE_PATH') + filepath

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

const readFromStorage: ReadFromStorage = async (filepath: string) =>
    fsPromises.readFile(getFullPath(filepath))

const LocalStorage: Storage = {
    writeToStorage,
    readFromStorage,
}

export default LocalStorage
