/* eslint-disable @typescript-eslint/ban-types */

import { PropertyDefinitions } from '../definitions'
import { MetadataProperties, Token } from '../protocols'
import { TargetType, MetadataKeyType, RecordType } from '../types'
import { aliasToString } from './alias.helper'
import { NATIVE_OBJECTS_TYPES } from './constants'

export const getObjectParams = <T> (
  target: TargetType<T>
): Array<Function> => {
  const key: MetadataKeyType = 'design:paramtypes'
  return Reflect.getMetadata(key, target)
}

export const getObjectInjectedTokens = <T> (
  target: TargetType<T>
): RecordType => {
  const key: MetadataKeyType = 'injectionstoken'
  return Reflect.getOwnMetadata(key, target) || {}
}

export const getObjectParamProperties = <T> (
  target: TargetType<T>,
  index: number
): MetadataProperties => {
  const propertyName = getObjectParamName(target, index)
  return {
    propertyName,
    isNative: isPropertyNativeObjectType(propertyName)
  }
}

export const getObjectParamName = <T> (
  target: TargetType<T>,
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

export const defineMetadata = <T> (
  metadataKey: MetadataKeyType,
  metadataValue: any,
  target: TargetType<T>
): void => {
  Reflect.defineMetadata(
    metadataKey,
    metadataValue,
    target
  )
}

export const defineInjectTokenMetadata = <T> (
  metadataValue: any,
  target: TargetType<T>
): void => {
  const key: MetadataKeyType = 'injectionstoken'
  defineMetadata(key, metadataValue, target)
}

export const defineTargetInjectedTokensMetadata = <T> (
  definitions: Omit<PropertyDefinitions<any>, 'kind' | 'propertyName'>,
  token: Token<T>
): void => {
  const { parent: target, propertyIndex } = definitions

  const metaParams = getObjectParams(target)
  const { propertyName: metadataPropertyName, isNative } = getObjectParamProperties(target, propertyIndex)

  const injectedTokens = getObjectInjectedTokens(target)
  const tokenKey = aliasToString(token.alias)
  injectedTokens[tokenKey] = isNative ? metadataPropertyName : metaParams[propertyIndex]

  defineInjectTokenMetadata(injectedTokens, target)
}