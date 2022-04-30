import { DotEnvManager } from '../../../src/base/envVariableManager/dotEnvManager'

describe('dotEnvManager Tests', () => {
    const realENV = process.env

    beforeEach(() => {
        jest.resetModules() //clear cache
        process.env = { ...realENV }
    })

    afterAll(() => {
        process.env = realENV
    })

    test('returns Correct Env-Variable', () => {
        process.env.STORAGE_PATH = 'fakeStoragePath'
        process.env.JWTSECRET = 'super_duper_secret'
        process.env.DB_CONNECTION_STRING = 'fakeConnectString'

        const resultStoragePath = DotEnvManager.getEnvVariable('STORAGE_PATH')
        const resultJWTSecret = DotEnvManager.getEnvVariable('JWTSECRET')
        const resultDB_CONNECTION_STRING = DotEnvManager.getEnvVariable(
            'DB_CONNECTION_STRING'
        )

        expect(resultStoragePath).toBe('fakeStoragePath')
        expect(resultJWTSecret).toBe('super_duper_secret')
        expect(resultDB_CONNECTION_STRING).toBe('fakeConnectString')
    })

    test('throws error on undefined Env-Variable', () => {
        process.env.STORAGE_PATH = undefined

        const expectedToThrowError = () =>
            DotEnvManager.getEnvVariable('STORAGE_PATH')

        expect(expectedToThrowError).toThrow('Environment Variable undefined')
    })
})
