import { Schema, model } from 'mongoose'
import { IUserWithoutID } from '../../interfaces/user'

const userSchema = new Schema<IUserWithoutID>({
    username: { type: String, required: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    registeredAt: { type: Date, immutable: true, default: () => Date.now() },
})

const UserModel = model('user', userSchema)
export default UserModel
