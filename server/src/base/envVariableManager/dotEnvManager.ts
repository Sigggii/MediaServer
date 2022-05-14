import dotenv from 'dotenv'
import {
    IENVVariable,
    IEnvVariableManager,
    IGetEnvVariable,
} from '../../shared/interfaces/utils/envVariableManager/IEnvVariableManager'

// load dotenv file
dotenv.config()

const getEnvVariable: IGetEnvVariable = (envVariable: IENVVariable) => {
    let value: string | undefined

    switch (envVariable) {
        case 'JWTSECRET':
            value = process.env.JWTSECRET
            break

        case 'STORAGE_PATH':
            value = process.env.STORAGE_PATH
            break
        case 'DB_CONNECTION_STRING':
            value = process.env.DB_CONNECTION_STRING
            break
        case 'JWT_EXPIRATION_TIME_IN_HOURS':
            value = process.env.JWT_EXPIRATION_TIME_IN_HOURS
            break
        default:
            throw new Error('Env Variable not defined')
    }

    if (value === undefined) throw new Error('Environment Variable undefined')

    return value
}

const DotEnvManager: IEnvVariableManager = {
    getEnvVariable,
}

export default DotEnvManager
