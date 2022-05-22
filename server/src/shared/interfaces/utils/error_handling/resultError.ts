export type ResultError =
    | {
          sendable: boolean
          type: string
          message: string | string[]
      }
    | undefined

export type ResultErrorTypeCreator<
    SENDABLE extends boolean,
    TYPE extends string,
    MESSAGE extends string | string[]
> = {
    sendable: SENDABLE
    type: TYPE
    message: MESSAGE
}
