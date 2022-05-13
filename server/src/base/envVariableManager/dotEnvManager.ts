import {
    ENVVariable,
    EnvVariableManager,
    getEnvVariable,
} from '../../shared/interfaces/utils/envVariableManager/envVariableManager'
import dotenv from 'dotenv'

//load dotenv file
dotenv.config()

const getEnvVariable: getEnvVariable = (envVariable: ENVVariable) => {
    let value: string | undefined = undefined

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
    }

    if (value === undefined) throw new Error('Environment Variable undefined')

    return value
}

export const DotEnvManager: EnvVariableManager = {
    getEnvVariable: getEnvVariable,
}
