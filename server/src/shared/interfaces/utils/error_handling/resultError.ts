export type ResultError =
    | {
          sendable: boolean
          type: string
          message: string | string[]
      }
    | undefined
