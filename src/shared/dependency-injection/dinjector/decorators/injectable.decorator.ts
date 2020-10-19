import dinjector from '..'
import { DecoratorOptions, InjectConstructor } from '../types'

export const Injectable = (options?: DecoratorOptions) => <T extends InjectConstructor> (
  constructor: T
): T => {
  dinjector.injectClass(
    {
      constructor
    },
    options
  )

  return constructor
}