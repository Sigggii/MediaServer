import { Types } from 'mongoose'

const getMockID = () => new Types.ObjectId().toString()
export default getMockID
