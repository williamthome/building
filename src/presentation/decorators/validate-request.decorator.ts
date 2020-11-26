// : Shared
import { DeepFlattenPaths } from '@/shared/types'
// > In: presentation layer
import { Controller, HandleResponse, HttpParameters, HttpRequest, Schema } from '../protocols'
import { badRequest, noContent } from '../factories/http.factory'
import { schemaError } from '../helpers/validation.helper'
import { MissingBodyError } from '../errors'
// < Out: only domain layer

export interface ValidateSchemaOptions<T extends Record<PropertyKey, any>> {
  schema: Schema<T>
  keys: DeepFlattenPaths<T>
  nullable?: boolean
}

export const ValidateBody =
  <TRequest, TResponse> (
    { schema, keys, nullable = false }: ValidateSchemaOptions<TRequest>
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
        const { body } = httpRequest

        if (!body && !nullable)
          return badRequest(new MissingBodyError())

        if (!body) return noContent()

        const bodyError = schemaError<TRequest>(body, schema, nullable, keys)
        if (bodyError) return bodyError

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }

export const ValidateParams =
  <TRequest, TResponse> (
    { schema, keys, nullable = false }: ValidateSchemaOptions<HttpParameters>
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
        const { params } = httpRequest

        const paramsError = schemaError(params || {}, schema, nullable, keys)
        if (paramsError) return paramsError

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }

export const ValidateQuery =
  <TRequest, TResponse> (
    { schema, keys, nullable = false }: ValidateSchemaOptions<HttpParameters>
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
        const { query } = httpRequest

        const queryError = schemaError(query || {}, schema, nullable, keys)
        if (queryError) return queryError

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }