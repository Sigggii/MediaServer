export type WriteToStorage = (filepath: string, fileToSave: Buffer) => void

export type ReadFromStorage = (filepath: string) => void

export type DoesFileExist = (filepath: string) => void

export type Storage = {
    writeToStorage: WriteToStorage
    readFromStorage: ReadFromStorage
}
