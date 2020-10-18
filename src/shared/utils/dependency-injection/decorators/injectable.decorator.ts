/* eslint-disable @typescript-eslint/no-explicit-any */
import injector from '../injector'
import { Constructor } from '../types/constructor.type'

export const Injectable = (): any => {
  return (target: Constructor<any>) => {
    injector.injectClass(target)
  }
}