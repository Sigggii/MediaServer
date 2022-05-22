import { parse } from 'date-fns'
import SendableError from '../../../utils/interfaces/SendableError'

export const dateStringFormat = 'yyyy-MM-dd'

const validateDateString = (dateString: string): Date => {
    const date = parse(dateString, dateStringFormat, new Date())
    if (Number.isNaN(date.getTime()))
        throw new SendableError(
            'Date Error',
            `Date must be in Format ${dateStringFormat}`
        )

    return date
}

export default validateDateString
