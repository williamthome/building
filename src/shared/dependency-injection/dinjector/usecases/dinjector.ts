import { Tokens } from '.'
import { Injector, Token, TokensMap, DecoratorOptions } from '../protocols'
import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'
import { AliasType, DefinitionsType, TargetType } from '../types'
import { aliasToString, defineTargetInjectedTokensMetadata, isClass, isDependency, isProperty, minimizeAlias } from '../helpers'

export class DInjector implements Injector {
  private tokens: TokensMap

  constructor () {
    this.tokens = new Tokens()
  }

  injectClass = <T> (definitions: Omit<ClassDefinitions<T>, 'properties'>, options?: DecoratorOptions<T>): void => {
    const token: Token<T> = {
      target: definitions.target,
      alias: options?.alias || definitions.target
    }

    const properties = this.tokens.getClassProperties(token.target)

    this.tokens.injectToken<T>(
      token,
      {
        ...definitions,
        kind: 'class',
        token,
        properties
      }
    )
  }

  injectProperty = async <T> (definitions: Omit<PropertyDefinitions<T>, 'dependencies'>, options?: DecoratorOptions<T>): Promise<void> => {
    const token: Token<T> = {
      target: definitions.parent,
      alias: options?.alias ? minimizeAlias(options.alias) : definitions.propertyName
    }

    // const dependencies = this.tokens.getPropertyDependencies(token)

    this.tokens.injectToken<T>(
      token,
      {
        ...definitions,
        kind: 'property',
        token,
        // dependencies
      }
    )
  }

  getToken = <T> (alias: AliasType<T>): DefinitionsType<T> => {
    return this.tokens.getDefinitions(alias)
  }

  defineProperty = <T> (alias: AliasType<T>, value: unknown): void => {
    const token = this.getToken<T>(alias)
    const dependencies = this.tokens.getPropertyDependencies(alias)

    const propertyName = alias.toString()
    for (const dependecy of dependencies) {
      const { instances } = dependecy
      if (instances) {
        for (const instance of instances) {
          Object.defineProperty(instance, propertyName, {
            value: value
          })
        }
      }
    }
  }


  /*
    if (dependencies.length > 0) {
      for (const dependency of dependencies) {
        if (!dependency.resolved) {
          console.log(`[DEPENDECIES] Resolving unresolved property ${aliasToString(token.alias)} for ${definitions.parent.target.name}...`)
          const resolvedValue = await this.resolve(dependency.target)
          this.updateClassProperty<T>(
            definitions.parent,
            definitions.propertyName,
            resolvedValue
          )
        }
      }
    }

    // defineTargetInjectedTokensMetadata(definitions, token)
  }

  resolve = async <T> (toResolve: TargetType<T>): Promise<T> => {
    return new Promise(resolve => {
      /*
      const tokenDefinitions = this.tokens.getDefinitions<T>(toResolve)

      const propertyDefinitions = tokenDefinitions as PropertyDefinitionsType<T>
      const { constructor, properties, token } = propertyDefinitions.parent

      const propertiesDefinitions = properties as PropertyDefinitionsType<T>[]

      const instance = this.updateClassProperties<T>(constructor, propertiesDefinitions)

      const dependencies = this.getPropertyDependencies(token.alias)
      const dependenciesKey: keyof PropertyDefinitionsType<T> = 'dependencies'
      Object.defineProperty(toResolve, dependenciesKey, {
        value: dependencies
      })

      const resolvedKey: keyof PropertyDefinitionsType<T> = 'resolved'
      Object.defineProperty(toResolve, resolvedKey, {
        value: true
      })

      console.log(`[RESOLVE] ${toResolve.name} resolved`)

      resolve(instance)
      */

  /*
  resolve()
})
}

private getClassProperties = <T> (
constructor: TargetType<T>
): PropertyDefinitionsType<T>[] => {
const properties: PropertyDefinitionsType<T>[] = []

for (const [token, tokenDefinitions] of this.tokens) {
  if (isProperty(tokenDefinitions) && token.target === constructor) {
    properties.push(tokenDefinitions as PropertyDefinitionsType<T>)
  }
}

return properties
}

defineProperty = <T> (alias: AliasType<T>, value: unknown): void => {
// > Get property definitions

const definitions = this.tokens.getDefinitions<T>(alias)
const { token } = definitions
const { parent, propertyName } = definitions as PropertyDefinitions<T>

// > Update definitions value and set as resolved

definitions.value = value
definitions.resolved = true

// > Update definitons on tokens map

this.tokens.set(definitions.token, definitions)

console.log(`[DEFINE PROPERTY] ${aliasToString(alias)} defined (and resolved?)`)

// > Update value on parent

const parentDefinitions = this.tokens.getDefinitions<T>(parent)
const { properties } = parentDefinitions as ClassDefinitions<T>

console.log((properties))

// const propertyIndex = properties.findIndex(p => p.)

// > update parent property

// >> VERIFY POSSIBLE CHANGE OF PARENT TO PROPERTY !!

Object.defineProperty(parentDefinitions.properties, propertyName, {
  value
})

// !! <<

this.tokens.set(token, parentDefinitions)

console.log(`[DEFINE PROPERTY] ${propertyName.toString()} updated for parent ${parent.target.name}`)

// > update dependencies

for (const [, definitions] of this.tokens.entries()) {
  const propertiesKey: keyof ClassDefinitions<any> = 'properties'
  if (propertiesKey in definitions) {
    const classDefinitions = definitions as ClassDefinitions<T>
    for (const classProperty of classDefinitions.properties) {
      if (isProperty(classProperty)) {
        const property = classProperty as PropertyDefinitions<T>
        if (property.propertyName === propertyName) {
          for (const instance of classProperty.instances) {
            Object.defineProperty(instance, propertyName, {
              ...property.propertyDescriptor,
              value
            })
          }
        }
      }
    }
  }
}
}

updateClassProperties = <T> (
constructor: TargetType<T>,
propertyTokens: PropertyDefinitions<T>[],
constructorInstance?: T
): T => {
const storedClassPropertyTokens = this.getClassProperties(constructor)

const instance = constructorInstance || new constructor()

for (const propertyToken of propertyTokens) {
  const { propertyName } = propertyToken

  const storedClassPropertyToken = storedClassPropertyTokens.find(
    classPropertyToken => classPropertyToken.propertyName === propertyName
  )

  if (!storedClassPropertyToken)
    throw new Error(`Property ${propertyName.toString()} inexists`)

  Object.defineProperty(instance, propertyName, {
    ...propertyToken.propertyDescriptor,
    value: storedClassPropertyToken.value
  })
}

console.log(`[UPDATE CLASS PROPERTIES] All ${constructor.name} properties updated`)

return instance
}

updateClassProperty = <T> (
toUpdate: TargetType<T>, // unique object on map
propertyName: string | symbol,
value: any
): T => {
// > get constructor class definitions

const tokenDefinitions = this.tokens.getDefinitions<T>(toUpdate)
const classDefinitions = tokenDefinitions as ClassDefinitions<T>
const { target: constructor, properties } = classDefinitions

const propertiesDefinitions = properties as PropertyDefinitions<T>[]
const propertyDefinition = propertiesDefinitions.find(property => property.propertyName === propertyName)

// > verify if property exists on constructor

if (!propertyDefinition)
  throw new Error(`${propertyName.toString()} inexists on ${toUpdate.name}`)

// > loop through constructor instances

const instances: T[] = []

for (const instance of tokenDefinitions.instances) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(
    instance, propertyName
  ) as PropertyDescriptor

  Object.defineProperty(instance, propertyName, {
    ...propertyDescriptor,
    value
  })

  instances.push(instance)
}

// > update definitions

tokenDefinitions.instances = instances
propertyDefinition.value = value

// > update constructor on tokens map

this.tokens.set(token, { ...tokenDefinitions, ...propertyDefinition })

console.log(`[UPDATE CLASS PROPERTY] ${propertyName.toString()} updated for ${constructor.name}`)

return tokenDefinitions.instances[0]
}

getPropertyDependencies = <T> (alias: AliasType<T>): DefinitionsType<T>[] => {
const dependencies: DefinitionsType<T>[] = []

for (const [token, tokenDefinitions] of this.tokens) {
  if (isClass(tokenDefinitions) && isDependency(alias, token)) {
    dependencies.push(tokenDefinitions)
  }
}

return dependencies
}
*/
}