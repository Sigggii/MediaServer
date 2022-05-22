import { Result } from '../../../interfaces/utils/error_handling/result'
import { makeErr, makeOk } from '../../error_handling/result/result_helper'

type FLACError = {
    sendable: true
    type: 'FLAC Error'
    message: 'File is no FLAC-Format'
}

type FLACResult = Result<FLAC, FLACError>

class FLAC {
    private readonly data: Buffer

    getData(): Buffer {
        return this.data
    }

    private constructor(data: Buffer) {
        this.data = data
    }

    public static create(data: Buffer): FLACResult {
        if (data.subarray(0, 4).toString('hex') !== '664c6143') {
            return makeErr<FLACError>({
                sendable: true,
                type: 'FLAC Error',
                message: 'File is no FLAC-Format',
            })
        }

        return makeOk(new FLAC(data))
    }
}

export default FLAC
