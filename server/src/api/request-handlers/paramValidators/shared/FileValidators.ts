import SendableError from '../../../utils/interfaces/SendableError'

const validateFile = (file?: any): Express.Multer.File => {
    if (!file || !file[0]) throw new SendableError('File Error', 'Missing File')
    if (file[0].buffer instanceof Buffer) return file[0] as Express.Multer.File
    throw new SendableError('File Error', 'File invalid')
}

export default validateFile
