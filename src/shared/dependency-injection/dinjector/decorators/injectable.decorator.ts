import dinjector from '..'
import { DecoratorOptions, InjectConstructor } from '../types'

export const Injectable = (options?: DecoratorOptions) => <T extends InjectConstructor<any>> (
  constructor: T
): T => {
  dinjector.injectClass<T>(
    {
      constructor,
      properties: []
    },
    options
  )

  return constructor
}