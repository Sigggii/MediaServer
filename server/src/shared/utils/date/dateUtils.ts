//returns Unix-Time in seconds
import { Schema } from 'mongoose'

export const getUnixTimeInHoursFromNow = (hours: number) => {
    const currentDate = Math.round(Date.now() / 1000) //currentTime in seconds
    return currentDate + hours * 60 * 60
}
