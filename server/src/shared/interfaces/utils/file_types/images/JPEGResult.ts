import { Result } from '../../error_handling/result'
import { JPEG } from '../../../../utils/file_types/images/JPEG'

export type JPEGError = {
    sendable: true
    type: 'JPEG Error'
    message: 'File is no JPEG-Format'
}

export type JPEGResult = Result<JPEG, JPEGError>
