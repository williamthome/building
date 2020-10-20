import { Injector, Token, TokensMap } from '../protocols'
import { Tokens } from '.'
import { ClassDefinitions, InjectClassTokenDefinitions, InjectPropertyTokenDefinitions, InjectTokenDefinitionType, PropertyDefinitions, TokenClassDefinitionsType, TokenDefinitionsType, TokenPropertyDefinitionsType } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'
import { aliasToString, defineTargetInjectedTokensMetadata, getObjectInjectedTokens, isAliasInjectConstructor, isClass, isDependency, isProperty, isToken, minimizeAlias } from '../helpers'

export class DInjector implements Injector {
  private _tokens: TokensMap

  constructor () {
    this._tokens = new Tokens()
  }

  get tokens (): TokensMap {
    return this._tokens
  }

  public injectClass = <T> (definitions: TokenClassDefinitionsType<T>, options?: DecoratorOptions): void => {
    const token: Token<T> = {
      constructor: definitions.constructor,
      alias: options?.alias || definitions.constructor
    }

    const properties = this.getClassProperties(token.constructor)

    this.tokens.injectClass<T>(
      token,
      {
        kind: 'class',
        ...definitions,
        token,
        properties,
        instances: []
      }
    )
  }

  public injectProperty = async <T> (definitions: TokenPropertyDefinitionsType<T>, options?: DecoratorOptions): Promise<void> => {
    const token: Token<T> = {
      constructor: definitions.parent,
      alias: options?.alias ? minimizeAlias(options.alias) : definitions.propertyName
    }

    const dependencies = this.getPropertyDependencies<T>(token.alias)

    this.tokens.injectProperty<T>(
      token,
      {
        kind: 'property',
        ...definitions,
        token,
        instances: [],
        dependencies
      }
    )


    if (dependencies.length > 0) {
      for (const dependency of dependencies) {
        if (!dependency.resolved) {
          console.log(`[DEPENDECIES] Resolving unresolved property ${aliasToString(token.alias)} for ${definitions.parent.name}...`)
          const resolvedValue = await this.resolve(dependency.constructor)
          this.updateClassProperty<T>(
            definitions.parent,
            definitions.propertyName,
            resolvedValue
          )
        }
      }
    }

    defineTargetInjectedTokensMetadata(definitions, token)
  }

  public resolve = async <T> (toResolve: InjectConstructor<T>): Promise<T> => {
    return new Promise(resolve => {
      const tokenDefinitions = this.tokens.getTokenDefinitions<T>(toResolve)

      const classDefinitions = tokenDefinitions as InjectClassTokenDefinitions<T>
      const { constructor, properties, token } = classDefinitions

      const propertiesDefinitions = properties as InjectPropertyTokenDefinitions<T>[]

      const instance = this.updateClassProperties<T>(constructor, propertiesDefinitions)

      const dependencies = this.getPropertyDependencies(token.alias)
      const dependenciesKey: keyof InjectPropertyTokenDefinitions<T> = 'dependencies'
      Object.defineProperty(toResolve, dependenciesKey, {
        value: dependencies
      })

      const resolvedKey: keyof InjectPropertyTokenDefinitions<T> = 'resolved'
      Object.defineProperty(toResolve, resolvedKey, {
        value: true
      })

      console.log(`[RESOLVE] ${toResolve.name} resolved`)

      resolve(instance)
    })
  }

  private getClassProperties = <T> (
    constructor: InjectConstructor<T>
  ): InjectPropertyTokenDefinitions<T>[] => {
    const properties: InjectPropertyTokenDefinitions<T>[] = []

    for (const [token, tokenDefinitions] of this.tokens) {
      if (isProperty(tokenDefinitions) && token.constructor === constructor) {
        properties.push(tokenDefinitions as InjectPropertyTokenDefinitions<T>)
      }
    }

    return properties
  }

  defineProperty = <T> (alias: Alias<T>, value: unknown): void => {
    const definitions = this.tokens.getTokenDefinitions(alias)

    if (!isProperty(definitions))
      throw new Error(`${aliasToString(alias)} must be a property`)

    const updatedDefinition: InjectTokenDefinitionType<T> = {
      ...definitions, value
    }

    updatedDefinition.resolved = true

    this.tokens.set(definitions.token, updatedDefinition)

    console.log(`[DEFINE PROPERTY] ${aliasToString(alias)} defined`)
  }

  updateClassProperties = <T> (
    constructor: InjectConstructor<T>,
    propertyTokens: InjectPropertyTokenDefinitions<T>[],
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
    toUpdate: InjectConstructor<T>, // unique object on map
    propertyName: string | symbol,
    value: any
  ): T => {
    // > get constructor class definitions

    const tokenDefinitions = this.tokens.getTokenDefinitions<T>(toUpdate)
    const classDefinitions = tokenDefinitions as InjectClassTokenDefinitions<T>
    const { constructor, properties, token } = classDefinitions

    const propertiesDefinitions = properties as InjectPropertyTokenDefinitions<T>[]
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

  getPropertyDependencies = <T> (alias: Alias<T>): InjectClassTokenDefinitions<T>[] => {
    const dependencies: InjectClassTokenDefinitions<T>[] = []

    for (const [token, tokenDefinitions] of this.tokens) {
      if (isClass(tokenDefinitions) && isDependency(alias, token)) {
        dependencies.push(tokenDefinitions as InjectClassTokenDefinitions<T>)
      }
    }

    return dependencies
  }
}