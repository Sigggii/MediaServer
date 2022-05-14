import { Types } from 'mongoose'

// User for creating the UserSchema in MongoDB and creating a new User in DB
export type IUserWithoutID = {
    username: string
    passwordHash: string
    registeredAt: Date
}

export type IUser = { _id: Types.ObjectId | string } & IUserWithoutID

export type IUserWithoutPassword = Omit<IUser, 'passwordHash'>
