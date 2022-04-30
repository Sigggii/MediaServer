import { JWTManager } from '../../../../src/service/shared/auth/jwtManager'

describe('JWT-Manager tests', () => {
    const realENV = process.env

    beforeEach(() => {
        jest.resetModules() //clear cache
        process.env = { ...realENV }
    })

    afterAll(() => {
        process.env = realENV
    })

    test('will receive valid jwt', async () => {
        process.env.JWTSECRET = require('crypto')
            .randomBytes(64)
            .toString('hex')

        //aktuelle Zeit + 2 Stunden in Sekunden
        const expiryDate =
            new Date(Date.now() + 2 * 60 * 60 * 1000).getTime() / 1000

        const jwt = await JWTManager.generateToken({ userID: '1' }, expiryDate)
        const payload = await JWTManager.verifyToken(jwt)

        expect(payload.isValid).toBeTruthy()
        expect(payload.authUserInfo).toStrictEqual({ userID: '1' })
    })

    test('will reject expired jwt', async () => {
        process.env.JWTSECRET = require('crypto')
            .randomBytes(64)
            .toString('hex')

        const currentDate = Date.now() / 1000 - 10 //In Sekunden
        const jwt = await JWTManager.generateToken({ userID: '1' }, currentDate)
        const payload = await JWTManager.verifyToken(jwt)
    })
})
