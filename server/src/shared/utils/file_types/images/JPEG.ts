import { makeErr, makeOk } from '../../error_handling/result/result_helper'
import { Result } from '../../../interfaces/utils/error_handling/result'

type JPEGError = {
    sendable: true
    type: 'JPEG Error'
    message: 'File is no JPEG-Format'
}

type JPEGResult = Result<JPEG, JPEGError>

class JPEG {
    private readonly data: Buffer

    get getData(): Buffer {
        return this.data
    }

    private constructor(data: Buffer) {
        this.data = data
    }

    public static create(data: Buffer): JPEGResult {
        if (data.subarray(0, 3).toString('hex') !== 'ffd8ff') {
            return makeErr<JPEGError>({
                sendable: true,
                type: 'JPEG Error',
                message: 'File is no JPEG-Format',
            })
        }
        return makeOk(new JPEG(data))
    }
}

export default JPEG
