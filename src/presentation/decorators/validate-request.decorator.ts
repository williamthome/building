// : Shared
import { DeepFlattenPaths } from '@/shared/types'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, Schema } from '../protocols'
import { badRequest, noContent } from '../factories/http.factory'
import { schemaError } from '../helpers/validation.helper'
// < Out: only domain layer

export interface ValidateRequestOptions<T extends Record<PropertyKey, any>> {
  schema: Schema<T>
  keys: DeepFlattenPaths<T>
  nullable: boolean
}

export const ValidateRequest =
  <TRequest, TResponse> (
    { schema, keys, nullable }: ValidateRequestOptions<TRequest>
  ) =>
    <TController extends Controller<TRequest>> (
      _controller: TController,
      _methodKey: string | symbol,
      descriptor: PropertyDescriptor
    ): any => {
      const originalMethod = descriptor.value

      descriptor.value = async function (
        ...args: [request: HttpRequest<TRequest>]
      ): HandleResponse<TResponse> {
        const { body } = args[0]

        if (!body && !nullable)
          return badRequest(new Error('Data is required'))

        if (!body) return noContent()

        const error = schemaError<TRequest>(body, schema, keys)
        if (error) return error

        return await originalMethod.apply(this, args)
      }

      return descriptor
    }