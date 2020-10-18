/* eslint-disable @typescript-eslint/no-explicit-any */
import injector from '../injector'

export const Inject = (token: string | symbol): any => {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    injector.injectProperty(token, target, parameterIndex)
  }
}