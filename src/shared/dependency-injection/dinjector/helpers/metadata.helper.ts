/* eslint-disable @typescript-eslint/ban-types */

import { PropertyDefinitions } from '../definitions'
import { MetadataKey, MetadataProperties } from '../types'
import { NATIVE_OBJECTS_TYPES } from './constants'

export const getObjectParams = (
  target: Record<string, unknown>
): Array<Function> => {
  const key: MetadataKey = 'design:paramtypes'
  return Reflect.getMetadata(key, target)
}

export const getObjectInjectedParams = (
  target: Record<string, unknown>
): Record<string, unknown> => {
  const key: MetadataKey = 'injectionstoken'
  return Reflect.getMetadata(key, target) || {}
}

export const getObjectParamProperties = (
  target: Record<string, unknown>,
  index: number
): MetadataProperties => {
  const propertyName = getObjectParamName(target, index)
  return {
    propertyName,
    isNative: isPropertyNativeObjectType(propertyName)
  }
}

export const getObjectParamName = (
  target: Record<string, unknown>,
  index: number
): string => getObjectParams(target)[index].name

export const isPropertyNativeObjectType = (
  metadataPropertyKey: string
): boolean =>
  NATIVE_OBJECTS_TYPES
    .map(type => type.toLowerCase())
    .some(
      type => type === metadataPropertyKey.toLowerCase()
    )

export const defineMetadata = (
  metadataKey: MetadataKey,
  metadataValue: unknown,
  target: Record<string, unknown>
): void => {
  Reflect.defineMetadata(
    metadataKey,
    metadataValue,
    target
  )
}

export const defineInjectTokenMetadata = (
  metadataValue: unknown,
  target: Record<string, unknown>
): void => {
  const key: MetadataKey = 'injectionstoken'
  defineMetadata(key, metadataValue, target)
}

export const defineTargetInjectedTokensMetadata = (
  definitions: Omit<PropertyDefinitions, 'kind'>
): void => {
  const { target, propertyName, propertyIndex } = definitions

  const metaParams = getObjectParams(target)
  const { propertyName: metadataPropertyName, isNative } = getObjectParamProperties(target, propertyIndex)

  const injectedTokens = getObjectInjectedParams(target)
  const tokenKey = propertyName.toString()
  injectedTokens[tokenKey] = isNative ? metadataPropertyName : metaParams[propertyIndex]

  defineInjectTokenMetadata(injectedTokens, target)
}