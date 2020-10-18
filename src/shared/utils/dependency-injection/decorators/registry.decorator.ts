/* eslint-disable @typescript-eslint/no-explicit-any */
import injector from '../injector'
import { Constructor } from '../types/constructor.type'

export const Registry = (token: string): any => {
  return (target: Constructor<any>) => {
    injector.registerClass(token, target)
  }
}