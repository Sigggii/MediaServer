import { createMock } from 'ts-auto-mock'
import { IUser } from '../../../../../../../src/models/shared/interfaces/user'

const createUserMock = () => createMock<IUser>()
export default createUserMock
