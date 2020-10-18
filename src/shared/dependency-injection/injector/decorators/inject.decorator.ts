import { INJECTION_TOKEN_METADATA_KEY, NATIVE_OBJECTS_TYPES } from '../helpers/constants'
import { InjectionToken } from '../protocols'

/**
 * PROPERTY DECORATOR
 */
export const Inject = <T extends { new(...args: any[]): any }> (
  target: T, _propertyName: string | symbol, propertyIndex: number
): T => {
  const metaParams = Reflect.getMetadata('design:paramtypes', target)
  const metadataKey = metaParams[propertyIndex].name

  const instance = new target()
  const propertyName = Object.keys(instance)[propertyIndex]

  const isNativeObjectType = NATIVE_OBJECTS_TYPES.some(
    type => type === metadataKey.toLowerCase()
  )

  const targetInjectedTokens = Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {}
  const injectedTokens: InjectionToken = targetInjectedTokens
  injectedTokens[propertyName] = isNativeObjectType ? metadataKey : metaParams[propertyIndex]

  Reflect.defineMetadata(
    INJECTION_TOKEN_METADATA_KEY,
    injectedTokens,
    target
  )

  console.log(`[INJECT] Property ${propertyName} injected`)

  return target
}
