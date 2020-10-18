import injector from '../injector'

/**
 * CLASS DECORATOR
 */
export const Injectable = <T extends { new(...args: any[]): any }> (
  constructor: T
): T => {
  const instancesOfType = injector.instances.get(constructor) || []
  instancesOfType.push(constructor)
  injector.instances.set(constructor, instancesOfType)
  injector.registers.set(constructor, constructor)

  console.log(`[INJECTABLE] Class ${constructor.name} injected`)

  return constructor
}