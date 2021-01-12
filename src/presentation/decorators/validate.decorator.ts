// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, ValidateDecoratorOptions } from '../protocols'
import { validationHelper } from '../helpers/validation.helper'
import { badRequest } from '../factories/http.factory'
// < Out: only domain layer

export const Validate = <
  TBody extends Record<string, unknown> | undefined,
  TParams extends Record<string, unknown> | undefined,
  TQuery extends Record<string, unknown> | undefined
>(
  validateOptions: ValidateDecoratorOptions<TBody, TParams, TQuery>
) => <TController extends Controller<any, any>>(
  _controller: TController,
  _methodKey: string | symbol,
  descriptor: PropertyDescriptor
): any => {
  const originalMethod = descriptor.value

  descriptor.value = async function (httpRequest: HttpRequest<any>): HandleResponse<any> {
    const {
      body: bodyOptions,
      params: paramsOptions,
      query: queryOptions,
      planLimitFor: limited
    } = validateOptions
    const { body, params, query } = httpRequest

    if (limited) {
      const limitError =
        limited === 'storageMb'
          ? await validationHelper.validateStoragePlanLimit(httpRequest)
          : await validationHelper.validateEntityPlanLimit(httpRequest, limited)
      if (limitError) return limitError
    }

    const paramsError = params && paramsOptions?.schema.validate(params, paramsOptions.options)
    if (paramsError) return badRequest(new Error(paramsError))

    const queryError = query && queryOptions?.schema.validate(query, queryOptions.options)
    if (queryError) return badRequest(new Error(queryError))

    const bodyError = bodyOptions?.schema.validate(body, bodyOptions.options)
    if (bodyError) return badRequest(new Error(bodyError))

    return await originalMethod.apply(this, [httpRequest])
  }

  return descriptor
}
