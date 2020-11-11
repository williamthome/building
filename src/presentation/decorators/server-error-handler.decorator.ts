// : Shared
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '../protocols'
import { serverError } from '../factories/http.factory'
// < Out: only domain layer

export const ServerErrorHandler =
  <TController extends Controller<any>> (
    _controller: TController,
    _methodKey: string | symbol,
    descriptor: PropertyDescriptor
  ): any => {
    const originalMethod = descriptor.value

    descriptor.value = async function (
      ...args: [request: HttpRequest<any>]
    ): HandleResponse<any> {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        console.error(error)
        return serverError(error)
      }
    }

    return descriptor
  }