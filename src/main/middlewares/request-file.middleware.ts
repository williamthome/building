import { Middleware, MiddlewareResponse, RequestFileLimit } from '../protocols'
import { badRequest, noContent } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleError } from '@/presentation/decorators'

export class RequestFileMiddleware implements Middleware {

  constructor (
    private readonly limit: RequestFileLimit
  ) { }

  @HandleError
  async handle<T> ({ files }: HttpRequest<T>): MiddlewareResponse {
    if (!files)
      return badRequest(new Error('No files'))

    if (files.length - 1 > this.limit.count)
      return badRequest(new Error('File count limit exceeded'))

    if (files.some(file => file.buffer.byteLength > this.limit.sizeInBytes))
      return badRequest(new Error('File size limit exceeded'))

    return noContent()
  }
}