import { PasswordValidation } from '../../../shared/utils/auth/passwordValidation'
import { ArgonManager } from './argonManager'
import { UserRepository } from '../../../models/shared/mongo/repositories/userRespository'
import { JWTManager } from './jwtManager'
import { getUnixTimeInHoursFromNow } from '../../../shared/utils/date/dateUtils'
import { RegisterParams, SignInParams } from '../interfaces/params/authParams'
import {
    isErr,
    isOK,
    makeErr,
    makeOk,
    unwrapResult,
} from '../../../shared/utils/error_handling/result/result_helper'
import {
    RegisterUserResult,
    SignInUserError,
    SignInUserResult,
} from '../interfaces/auth/authResult'
import { DotEnvManager } from '../../../base/envVariableManager/dotEnvManager'

const registerUser = async (userData: RegisterParams): RegisterUserResult => {
    const validationResult = PasswordValidation.detailedPasswordValidation(
        userData.password
    )
    if (!isOK(validationResult)) return makeErr(unwrapResult(validationResult))

    const passwordHash = await ArgonManager.hashPassword(userData.password)

    const createUserResult = await UserRepository.createUser({
        username: userData.username,
        passwordHash: passwordHash,
    })

    if (isErr(createUserResult)) return createUserResult

    const user = unwrapResult(createUserResult)
    return makeOk(
        await JWTManager.generateToken(
            { userID: user._id.toString() },
            getUnixTimeInHoursFromNow(
                parseInt(
                    DotEnvManager.getEnvVariable('JWT_EXPIRATION_TIME_IN_HOURS')
                )
            )
        )
    )
}

const signInUser = async (userData: SignInParams): SignInUserResult => {
    const getUserResult = await UserRepository.getUserWithPasswordHash(
        userData.username
    )
    if (isOK(getUserResult)) {
        const userFromDB = unwrapResult(getUserResult)
        if (
            await ArgonManager.verifyPassword(
                userFromDB.passwordHash,
                userData.password
            )
        ) {
            return makeOk(
                await JWTManager.generateToken(
                    { userID: userFromDB._id.toString() },
                    getUnixTimeInHoursFromNow(
                        parseInt(
                            DotEnvManager.getEnvVariable(
                                'JWT_EXPIRATION_TIME_IN_HOURS'
                            )
                        )
                    )
                )
            )
        }
    }
    return makeErr<SignInUserError>({
        sendable: true,
        type: 'User SignIn',
        message: 'Username or Password invalid',
    })
}

export const AuthService = {
    registerUser: registerUser,
    signInUser: signInUser,
}
