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
  nullable: boolean,
  paramsSchema?: Schema<any>
  paramKeys?: DeepFlattenPaths<any>
}

export const ValidateRequest =
  <TRequest, TResponse> (
    { paramsSchema, paramKeys, schema, keys, nullable }: ValidateRequestOptions<TRequest>
  ) =>
    <TController extends Controller<TRequest, TResponse>> (
      _controller: TController,
      _methodKey: string | symbol,
      descriptor: PropertyDescriptor
    ): any => {
      const originalMethod = descriptor.value

      descriptor.value = async function (
        ...args: [request: HttpRequest<TRequest>]
      ): HandleResponse<TResponse> {
        const { params, body } = args[0]

        if (paramsSchema) {
          const paramsError = schemaError(params || {}, paramsSchema, nullable, paramKeys)
          if (paramsError) return paramsError
        }

        if (!body && !nullable)
          return badRequest(new Error('Data is required'))

        if (!body) return noContent()

        const bodyError = schemaError<TRequest>(body, schema, nullable, keys)
        if (bodyError) return bodyError

        return await originalMethod.apply(this, args)
      }

      return descriptor
    }