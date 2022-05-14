import crypto from 'crypto'

const setupDotEnv = () => {
    process.env.STORAGE_PATH = 'C:\\StoragePath'
    process.env.JWTSECRET = crypto.randomBytes(256).toString('hex')
    process.env.DB_CONNECTION_STRING = 'uselessConnectionString'
    process.env.JWT_EXPIRATION_TIME_IN_HOURS = '2'
}

export default setupDotEnv
