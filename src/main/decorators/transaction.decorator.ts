import { Controller } from '@/presentation/protocols'
import container, { Inject } from '@/shared/dependency-injection'
import { Route } from '../protocols'
import { TransactionController } from './transaction-controller.decorator'

type ControllerConstructor<TRequest, TResponse> = new(...args: any[]) => Controller<TRequest, TResponse>

export const InjectTransaction = <TRequest, TResponse> (controller: ControllerConstructor<TRequest, TResponse>) => <T extends Route<TRequest, TResponse>> (
  target: T,
  _propertyKey: string | symbol,
  parameterIndex: number
): void => {
  const getArgumentNames = (): string[] => {
    const RegExInsideParentheses = /[(][^)]*[)]/
    const RegExParenthesesAndSpaces = /[()\s]/g
    const regExValue = RegExInsideParentheses.exec(target.toString())
    if (!regExValue) return []
    else return regExValue[0].replace(RegExParenthesesAndSpaces, '').split(',').map(str => str.trim())
  }

  const key = getArgumentNames()[parameterIndex]

  if (key !== 'controller')
    throw new Error('Use transaction decorator for controller parameter in route constructor')

  Inject(controller)

  Object.defineProperty((target as any).prototype, key, {
    get: () => new TransactionController(container.resolve<Controller<TRequest, TResponse>>(controller)),
    set: () => new Error('Property controller in route is readonly')
  })
}