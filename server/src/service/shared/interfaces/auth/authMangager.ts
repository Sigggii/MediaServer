export interface AuthUserInformation {
    userID: string
}

export type generateToken = (
    playload: AuthUserInformation,
    expirationTime: number
) => Promise<string>

type VerifyTokenValid = {
    isValid: true
    authUserInfo: AuthUserInformation
}

type VerifyTokenInvalid = {
    isValid: false
    authUserInfo: undefined
}

export type VerifyTokenResult = VerifyTokenValid | VerifyTokenInvalid

export type verifyToken = (token: string) => Promise<VerifyTokenResult>

export type AuthManager = {
    generateToken: generateToken
    verifyToken: verifyToken
}
