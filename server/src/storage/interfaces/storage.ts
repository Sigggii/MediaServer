export type WriteToStorage = (
    filepath: string,
    fileToSave: Buffer,
    onError: () => void,
    onSuccess?: () => void
) => void

export type ReadFromStorage = (
    filepath: string,
    onError: () => void,
    onSuccess: () => void
) => void

export type DoesFileExist = (filepath: string) => void

export type Storage = {
    writeToStorage: WriteToStorage
    readFromStorage: ReadFromStorage
    doesFileExist: DoesFileExist
}
