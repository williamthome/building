import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'
import { aliasToString, isAliasInjectConstructor, isClass, isDependency, isProperty } from '../helpers'
import { InjectorMap, InjectorModel } from '../models/injector.model'
import { Token, TokensMap } from '../protocols'
import { AliasType, DefinitionsType, TargetType } from '../types'

export class Tokens extends Map<Token<any>, DefinitionsType<any>> implements TokensMap {

  injectToken = <T> (token: Token<T>, definitions: Omit<DefinitionsType<T>, 'instances'>): void => {
    // > Get all instances of token to update token instances

    const tokenDefinitions = this.get(token)

    const instances: T[] = tokenDefinitions?.instances || []
    const instance = new token.target()
    instances.push(instance)

    // > Update token on tokens map

    this.set(token, { ...definitions, instances })
  }

  getDefinitions = <T> (alias: AliasType<T>): DefinitionsType<T> => {
    const definitions = isAliasInjectConstructor<T>(alias)
      ? this.getDefinitionsTypeByConstructor<T>(alias)
      : this.getDefinitionsTypeByAlias<T>(alias)
    if (!definitions) throw new Error(`Alias ${aliasToString(alias)} is invalid`)
    return definitions
  }

  getDefinitionsTypeByConstructor = <T> (constructor: TargetType<T>): DefinitionsType<T> | undefined => {
    for (const [, tokenDefinitions] of this) {
      if (tokenDefinitions.target && tokenDefinitions.target === constructor) {
        return tokenDefinitions
      }
    }
  }

  getDefinitionsTypeByAlias = <T> (alias: AliasType<T>): DefinitionsType<T> | undefined => {
    for (const [token, tokenDefinitions] of this) {
      if (token.alias && token.alias === alias) {
        return tokenDefinitions
      }
    }
  }

  getClassDefinitions = <T> (alias: AliasType<T>): ClassDefinitions<T> => {
    const definitions = this.getDefinitions(alias)
    if (!isClass(definitions)) throw new Error(`${aliasToString(alias)} isn't kind of class`)
    return definitions as ClassDefinitions<T>
  }

  getPropertyDefinitions = <T> (alias: AliasType<T>): PropertyDefinitions<T> => {
    const definitions = this.getDefinitions(alias)
    if (!isProperty(definitions)) throw new Error(`${aliasToString(alias)} isn't kind of property`)
    return definitions as PropertyDefinitions<T>
  }

  getClassProperties = (target: TargetType<unknown>): Token<unknown>[] => {
    const properties: Token<unknown>[] = []
    for (const [token, tokenDefinitions] of this) {
      if (isProperty(tokenDefinitions) && token.target === target) {
        properties.push(token)
      }
    }
    return properties
  }

  getPropertyDependencies = (alias: AliasType<unknown>): DefinitionsType<unknown>[] => {
    const dependencies: DefinitionsType<unknown>[] = []
    for (const [, tokenDefinitions] of this) {
      if (isClass(tokenDefinitions)) {
        const { properties } = tokenDefinitions
        if (properties) {
          for (const property of properties) {
            if (property.alias === alias) {
              dependencies.push(tokenDefinitions)
            }
          }
        }
      }
    }
    return dependencies
  }
}