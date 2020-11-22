// : Shared
import container from '@/shared/dependency-injection'
// > In: presentation layer
import { serverError } from '../factories/http.factory'
import { HandleResponse } from '../protocols'
// < Out: only domain layer
import { LogErrorUseCase } from '@/domain/usecases'

export const HandleLogError =
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
        if (process.env.NODE_ENV === 'production') {
          const logErrorUseCase = container.resolve<LogErrorUseCase>('logErrorUseCase')
          await logErrorUseCase.call({
            stack: errorStack(error),
            date: new Date()
          })
        }
        console.error(error)
        return serverError(error)
      }
    }

    return descriptor
  }

const errorStack = (error: any): string =>
  typeof error === 'undefined'
    ? 'Error is undefined'
    : 'stack' in error
      ? error['stack']
      : typeof error === 'string'
        ? error
        : typeof error === 'bigint' ||
          typeof error === 'boolean' ||
          typeof error === 'number' ||
          typeof error === 'symbol'
          ? error.toString()
          : JSON.stringify(error)