export type Result<T> = {
  kind: 'ok' | 'error'
  result?: T
}

export type Response<T> = Promise<Result<T | Error>>