module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    restoreMocks: true,
}
