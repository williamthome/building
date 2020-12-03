// > In: presentation layer
import {
  Controller,
  HandleResponse,
  HttpRequest,
  ValidateOptions
} from '../protocols'
import { validationHelper } from '../helpers/validation.helper'
// < Out: only domain layer

export const Validate =
  <TRequest = undefined, TResponse = null> (
    validateOptions: ValidateOptions<TRequest>
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
        const validationError = await validationHelper.validateHttpRequest(validateOptions, httpRequest)
        if (validationError)
          return validationError

        return await originalMethod.apply(this, [httpRequest])
      }

      return descriptor
    }