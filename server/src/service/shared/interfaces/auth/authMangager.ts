export interface AuthUserInformation {
    userID: string
}

export type IGenerateToken = (
    playload: AuthUserInformation,
    expirationTime: number
) => Promise<string>

type IVerifyTokenValid = {
    isValid: true
    authUserInfo: AuthUserInformation
}

type IVerifyTokenInvalid = {
    isValid: false
    authUserInfo: undefined
}

export type IVerifyTokenResult = IVerifyTokenValid | IVerifyTokenInvalid

export type IVerifyToken = (token: string) => Promise<IVerifyTokenResult>

export type IAuthManager = {
    generateToken: IGenerateToken
    verifyToken: IVerifyToken
}
