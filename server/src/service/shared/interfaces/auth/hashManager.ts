export type HashPassword = (password: string) => Promise<string>

export type VerifyPassword = (
    hash: string,
    password: string
) => Promise<boolean>

export type HashManager = {
    hashPassword: HashPassword
    verifyPassword: VerifyPassword
}
