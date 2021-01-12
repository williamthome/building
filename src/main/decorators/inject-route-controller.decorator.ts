import { Controller } from '@/presentation/protocols'
import container, { Inject } from '@/shared/dependency-injection'
import { Route } from '../protocols'
import { TransactionController } from './transaction-controller.decorator'

type ControllerConstructor<TRequest, TResponse> = new (...args: any[]) => Controller<
  TRequest,
  TResponse
>

export const InjectRouteController = <TRequest, TResponse>(
  newableController: ControllerConstructor<TRequest, TResponse>
) => <T extends Route<TRequest, TResponse>>(
  target: T,
  _propertyKey: string | symbol,
  parameterIndex: number
): void => {
  const getArgumentNames = (): string[] => {
    const RegExInsideParentheses = /[(][^)]*[)]/
    const RegExParenthesesAndSpaces = /[()\s]/g
    const regExValue = RegExInsideParentheses.exec(target.toString())
    if (!regExValue) return []
    else
      return regExValue[0]
        .replace(RegExParenthesesAndSpaces, '')
        .split(',')
        .map((str) => str.trim())
  }

  const key = getArgumentNames()[parameterIndex]

  Inject(newableController)

  Object.defineProperty((target as any).prototype, key, {
    get: function () {
      const controller = container.resolve<Controller<TRequest, TResponse>>(newableController)
      return controller.usesTransaction ? new TransactionController(controller) : controller
    },
    set: () => {
      // if (process.env.NODE_ENV !== 'test') throw new Error(`Property ${key} in route is readonly`)
    }
  })
}
