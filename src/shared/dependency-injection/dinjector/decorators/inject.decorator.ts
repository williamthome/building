import dinjector from '..'
import { InjectorModel } from '../models/injector.model'
import { DecoratorOptions } from '../protocols'
import { TargetType } from '../types'

export const Inject = (options?: DecoratorOptions<any>) => <T extends TargetType<any>> (
  target: T, _propertyName: string | symbol, propertyIndex: number
): T => {
  const instance = new target()
  const propertyName = Object.keys(instance)[propertyIndex]

  const propertyDescriptor = Object.getOwnPropertyDescriptor(
    instance, propertyName
  ) as PropertyDescriptor

  dinjector.push(new InjectorModel(
    // dinjector,
    {
      id: propertyName,
      alias: options?.alias.toString() || propertyName || target
    },
    {
      name: propertyName,
      descriptor: propertyDescriptor
    },
    target.name
  ), 'property')

  /*
  dinjector.injectProperty<T>(
    {
      parent: target,
      propertyName,
      propertyDescriptor,
      propertyIndex
    },
    options
  )
  */

  return target
}