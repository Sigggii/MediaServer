export interface AuthUserInformation {
    userID: string
}

export type generateToken = (
    playload: AuthUserInformation,
    expirationTime: number
) => Promise<string>

export type VerifyTokenResult = {
    isValid: boolean
    authUserInfo?: AuthUserInformation
}

export type verifyToken = (token: string) => Promise<VerifyTokenResult>

export type AuthManager = {
    generateToken: generateToken
    verifyToken: verifyToken
}
