import { createNormalCTXMock } from '../../testUtilities/mocks/api/koaMocks'
import { UnAuthorizedError } from '../../../src/api/middleware/shared/authMiddleware'
import errorHandler from '../../../src/api/middleware/shared/error_handler'

describe('Error Handler Test', () => {
    describe('errorHandler', () => {
        it('handles UnAuthorizedErrorCorrectly', async () => {
            const ctx = createNormalCTXMock()
            const nextMock = () => {
                throw UnAuthorizedError
            }

            await errorHandler(ctx, nextMock)

            expect(ctx.status).toBe(401)
            expect(ctx.body).toStrictEqual({
                error: {
                    type: 'Unauthenticated Error',
                    message: 'Plz Login',
                },
            })
        })

        it('handles normal Error correctly', async () => {
            const ctx = createNormalCTXMock()
            const nextMock = () => {
                throw Error('Alaaarrrmmm!')
            }

            await errorHandler(ctx, nextMock)

            expect(ctx.status).toBe(500)
            expect(ctx.body).toStrictEqual({
                error: {
                    type: 'Unexpected Error',
                    message: '',
                },
            })
        })
    })
})
