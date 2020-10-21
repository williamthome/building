import dinjector from '..'
import { Injector } from '../models'
import { Options } from '../protocols'
import { Target } from '../usecases'

/**
 * Injects a property on injector map
 *
 * @param options alias
 */
export const Inject = (options?: Options<any>) => <T extends Target<any>> (
  target: T, _propertyName: string | symbol, propertyIndex: number
): T => {
  // > Create a new instance to get target property
  const instance = new target()

  // > Get property info
  const propertyName = Object.keys(instance)[propertyIndex]
  const propertyDescriptor = Object.getOwnPropertyDescriptor(
    instance, propertyName
  ) as PropertyDescriptor

  // > Push property to injector map
  dinjector.push(new Injector(
    // * idalias
    {
      id: propertyName,
      alias: options?.alias.toString() || propertyName || target
    },
    // * property info
    {
      name: propertyName,
      descriptor: propertyDescriptor
    },
    // * target as dependency of property
    target.name
    // * kind
  ), 'property'
  )
  // > Return the original target
  return target
}