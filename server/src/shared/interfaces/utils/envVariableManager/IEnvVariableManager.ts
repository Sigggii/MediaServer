export type IENVVariable =
    | 'STORAGE_PATH'
    | 'JWTSECRET'
    | 'DB_CONNECTION_STRING'
    | 'JWT_EXPIRATION_TIME_IN_HOURS'

export type IGetEnvVariable = (envVariable: IENVVariable) => string

export type IEnvVariableManager = {
    getEnvVariable: IGetEnvVariable
}
