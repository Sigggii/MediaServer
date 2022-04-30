import { createMock } from 'ts-auto-mock'
import { User } from '../../../../../../../src/models/shared/interfaces/user'

export const createUserMock = () => {
    return createMock<User>()
}
