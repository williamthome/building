import { HttpStatusCode } from '../constants'
import { ServerError, UnauthorizedError } from '../errors'
import { HttpOptions, HttpResponse } from '../protocols'

export const ok = <T>(response: T, options?: HttpOptions): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: response,
  options
})

export const noContent = (options?: HttpOptions): HttpResponse<null> => ({
  statusCode: HttpStatusCode.NO_CONTENT,
  body: null,
  options
})

export const badRequest = (error: Error, options?: HttpOptions): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
  options
})

export const unauthorized = (options?: HttpOptions): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: new UnauthorizedError(),
  options
})

export const forbidden = (error: Error, options?: HttpOptions): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.FORBIDDEN,
  body: error,
  options
})

export const notFound = (error: Error, options?: HttpOptions): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: error,
  options
})

export const serverError = (error: Error, options?: HttpOptions): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(error.stack),
  options
})
