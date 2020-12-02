// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '../protocols'
import { badRequest } from '../factories/http.factory'
import { BannedFieldError } from '../errors'
// < Out: only domain layer

export const BannedFields =
  <TRequest extends Record<PropertyKey, any>, TResponse> (
    fields: Array<keyof TRequest>
  ) =>
    <TController extends Controller<TRequest, TResponse>> (
      _controller: TController,
      _methodKey: string | symbol,
      descriptor: PropertyDescriptor
    ): any => {
      const originalMethod = descriptor.value

      descriptor.value = async function (
        httpRequest: HttpRequest<TRequest>
      ): HandleResponse<TResponse> {
        const body = httpRequest.body as Record<PropertyKey, any>

        for (const field of fields) {
          if (field in body)
            return badRequest(new BannedFieldError(field))
        }

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }