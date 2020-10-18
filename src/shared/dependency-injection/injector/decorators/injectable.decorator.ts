import injector from '../injector'
import { InjectConstructor } from '../types'
import { ClassDecoratorOptions } from '../helpers/class-decorator.options'

/**
 * CLASS DECORATOR
 */
export const Injectable = (options?: ClassDecoratorOptions) => <T extends InjectConstructor> (
  constructor: T
): T => {
  const alias = options?.alias ? options?.alias : constructor
  const instancesOfType = injector.instances.get(alias) || []
  instancesOfType.push(constructor)
  injector.instances.set(alias, instancesOfType)
  injector.registers.set(alias, constructor)

  console.log(`[INJECTABLE] Class ${typeof alias === 'string' ? alias : alias.name} injected`)

  return constructor
}