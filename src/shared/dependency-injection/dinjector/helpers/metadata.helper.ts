/* eslint-disable @typescript-eslint/ban-types */

import { PropertyDefinitions } from '../definitions'
import { Token } from '../protocols'
import { MetadataKey, MetadataProperties, Property } from '../types'
import { aliasToString } from './alias.helper'
import { NATIVE_OBJECTS_TYPES } from './constants'

export const getObjectParams = (
  target: Property
): Array<Function> => {
  const key: MetadataKey = 'design:paramtypes'
  return Reflect.getMetadata(key, target)
}

export const getObjectInjectedTokens = (
  target: Property
): Property => {
  const key: MetadataKey = 'injectionstoken'
  return Reflect.getOwnMetadata(key, target) || {}
}

export const getObjectParamProperties = (
  target: Property,
  index: number
): MetadataProperties => {
  const propertyName = getObjectParamName(target, index)
  return {
    propertyName,
    isNative: isPropertyNativeObjectType(propertyName)
  }
}

export const getObjectParamName = (
  target: Property,
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
  metadataValue: any,
  target: Property
): void => {
  Reflect.defineMetadata(
    metadataKey,
    metadataValue,
    target
  )
}

export const defineInjectTokenMetadata = (
  metadataValue: any,
  target: Property
): void => {
  const key: MetadataKey = 'injectionstoken'
  defineMetadata(key, metadataValue, target)
}

export const defineTargetInjectedTokensMetadata = (
  definitions: Omit<PropertyDefinitions, 'kind' | 'propertyName'>,
  token: Token
): void => {
  const { parent: target, propertyIndex } = definitions

  const metaParams = getObjectParams(target)
  const { propertyName: metadataPropertyName, isNative } = getObjectParamProperties(target, propertyIndex)

  const injectedTokens = getObjectInjectedTokens(target)
  const tokenKey = aliasToString(token.alias)
  injectedTokens[tokenKey] = isNative ? metadataPropertyName : metaParams[propertyIndex]

  defineInjectTokenMetadata(injectedTokens, target)
}