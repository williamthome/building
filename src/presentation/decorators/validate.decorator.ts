// > In: presentation layer
import {
  Controller,
  HandleResponse,
  HttpRequest,
  ValidateOptions
} from '../protocols'
import {
  validateBody,
  validateParams,
  validatePlanLimit,
  validateQuery
} from '../helpers/validation.helper'
// < Out: only domain layer

export const Validate =
  <TRequest = undefined, TResponse = null> (
    {
      body: bodySchema,
      params: paramsSchema,
      query: querySchema,
      limited
    }: ValidateOptions<TRequest>
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
        const { body, params, query } = httpRequest

        if (limited) {
          const limitedError = await validatePlanLimit(httpRequest, limited)
          if (limitedError) return limitedError
        }

        if (paramsSchema) {
          const paramsError = validateParams(params, paramsSchema)
          if (paramsError) return paramsError
        }

        if (querySchema) {
          const queryError = validateQuery(query, querySchema)
          if (queryError) return queryError
        }

        if (bodySchema) {
          const bodyError = validateBody(body, bodySchema)
          if (bodyError) return bodyError
        }

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }