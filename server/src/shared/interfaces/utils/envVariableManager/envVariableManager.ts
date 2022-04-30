export type ENVVariable =
    | 'STORAGE_PATH'
    | 'JWTSECRET'
    | 'DB_CONNECTION_STRING'
    | 'JWT_EXPIRATION_TIME_IN_HOURS'

export type getEnvVariable = (envVariable: ENVVariable) => string

export type EnvVariableManager = {
    getEnvVariable: getEnvVariable
}
