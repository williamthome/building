import { HttpStatusCode } from '../constants'
import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const ok = <T>(response: T): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: response
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(error.stack)
})