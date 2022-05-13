import {
    JPEGError,
    JPEGResult,
} from '../../../interfaces/utils/file_types/images/JPEGResult'
import { makeErr, makeOk } from '../../error_handling/result/result_helper'

export class JPEG {
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
