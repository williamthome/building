import dinjector from '..'
import { DecoratorOptions, InjectConstructor } from '../types'

export const Inject = (options?: DecoratorOptions) => <T extends InjectConstructor<any>> (
  target: T, _propertyName: string | symbol, propertyIndex: number
): T => {
  const instance = new target()
  const propertyName = Object.keys(instance)[propertyIndex]

  // const propertyDescriptor = Object.getOwnPropertyDescriptor(instance, propertyName)

  dinjector.injectProperty(
    {
      parent: target,
      propertyName,
      propertyIndex
    },
    options
  )
  return target
}