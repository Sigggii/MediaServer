export type HashPassword = (password: string) => Promise<string>

export type VerifyPassword = (
    hash: string,
    password: string
) => Promise<Boolean>

export type HashManager = {
    hashPassword: HashPassword
    verifyPassword: VerifyPassword
}
