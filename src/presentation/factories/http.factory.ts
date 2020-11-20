import { HttpStatusCode } from '../constants'
import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const ok = <T>(response: T): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: response
})

export const noContent = (): HttpResponse<null> => ({
  statusCode: HttpStatusCode.NO_CONTENT,
  body: null
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.FORBIDDEN,
  body: error
})

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(error.stack)
})