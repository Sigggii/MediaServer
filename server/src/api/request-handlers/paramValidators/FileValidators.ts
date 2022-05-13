import { InvalidParameterError } from '../../middleware/shared/param-validator/invalidParameterError'
import { SendableError } from '../../utils/interfaces/SendableError'

export const validateFile = (file?: any): Buffer => {
    if (!file || !file[0]) throw new SendableError('File Error', 'Missing File')
    if (file[0].buffer instanceof Buffer) return file[0].buffer
    throw new SendableError('File Error', 'File invalid')
}
