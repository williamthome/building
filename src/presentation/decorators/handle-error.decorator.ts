// > In: presentation layer
import { serverError } from '../factories/http.factory'
import { HandleResponse } from '../protocols'

export const HandleError =
  <TTarget, TReturn extends HandleResponse<TReturn>> (
    _target: TTarget,
    _methodKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor | void => {
    const originalMethod = descriptor.value

    descriptor.value = async function (
      ...args: any[]
    ): HandleResponse<TReturn> {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        console.error(error)
        return serverError(error)
      }
    }

    return descriptor
  }