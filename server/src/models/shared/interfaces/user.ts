import { Types } from 'mongoose'

//User for creating the UserSchema in MongoDB and creating a new User in DB
export type UserWithoutID = {
    username: string
    passwordHash: string
    registeredAt: Date
}

export type User = { _id: Types.ObjectId } & UserWithoutID

export type UserWithoutPassword = Omit<User, 'passwordHash'>
