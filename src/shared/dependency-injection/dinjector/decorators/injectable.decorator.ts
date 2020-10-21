import dinjector from '..'
import { InjectorModel } from '../models/injector.model'
import { DecoratorOptions } from '../protocols'
import { TargetType } from '../types'

export const Injectable = (options?: DecoratorOptions<any>) => <T extends TargetType<any>> (
  target: T
): T => {
  /*
  dinjector.injectClass<T>(
    {
      target
    },
    options
  )
  */

  dinjector.push(new InjectorModel(
    // dinjector,
    {
      id: target,
      alias: options?.alias.toString() || target
    }
  ), 'class')

  return target
}