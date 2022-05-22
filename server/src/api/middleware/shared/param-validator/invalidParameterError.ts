export interface InvalidParameterErrorEntry {
    param: string
    message?: string
}

export class InvalidParameterError extends Error {
    invalidParamEntries: InvalidParameterErrorEntry[]

    constructor(data: InvalidParameterErrorEntry[]) {
        super('')
        this.name = 'InvalidParameterError'
        this.invalidParamEntries = data
    }
}
