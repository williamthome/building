import container from '@/shared/dependency-injection'
import { Controller } from '../protocols'

type InjectableControllerOptions = Pick<Controller<any, any>, 'usesTransaction'>

export const InjectableController = <TRequest = any, TResponse = any> (
  opts?: InjectableControllerOptions
) => <T extends new (...args: any[]) => Controller<TRequest, TResponse>> (controller: T): T => {
  container.define(controller).asNewable(controller)

  const usesTransactionKey: keyof Controller<TRequest, TResponse> = 'usesTransaction'

  Object.defineProperty((controller as any).prototype, usesTransactionKey, {
    get: () => {
      return opts?.usesTransaction
    },
    set: () => new Error(`Property ${usesTransactionKey} in controller is readonly`)
  })

  return controller
}