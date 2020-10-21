import dinjector from '..'
import { Injector } from '../models'
import { Options } from '../protocols'
import { Target } from '../usecases'

/**
 * Injects a class on injector map
 *
 * @param options alias
 */
export const Injectable = (options?: Options<any>) => <T extends Target<any>> (
  target: T
): T => {
  // > Push class to injector map
  dinjector.push(new Injector(
    // * idalias
    {
      id: target,
      alias: options?.alias.toString() || target
    }
    // * kind
  ), 'class')
  // > Return the original target
  return target
}