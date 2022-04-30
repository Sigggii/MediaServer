import { User } from '../../interfaces/user'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<User>({
    username: { type: String, required: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    registeredAt: { type: Date, immutable: true, default: () => Date.now() },
})

export const UserModel = model('user', userSchema)
