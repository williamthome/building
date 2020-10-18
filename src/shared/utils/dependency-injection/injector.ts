/**
 * # References
 * > https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
 * > https://github.com/ova2/frontend-tooling-tutorial/tree/master/typescript-playground/dependency-injection-container
 * > https://github.com/microsoft/tsyringe
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { Constructor } from './types/constructor.type'

const INJECTION_TOKEN_METADATA_KEY = 'injectionTokens'

class Injector {
  public typeInfos: Map<Constructor<any>, any[]> = new Map()
  public registers: Map<string | symbol, Constructor<any>> = new Map()

  registerClass = (token: string | symbol, target: Constructor<any>): void => {
    const parsedToken = token.toString()

    if (this.registers.has(token)) {
      throw new Error(`Token ${parsedToken} already registered`)
    }

    this.registers.set(token, target)

    console.log(`[REGISTRY] Token ${parsedToken} registered as ${target.name}`)
  }

  injectClass = (target: Constructor<any>) => {
    const params: any[] = Reflect.getMetadata('design:paramtypes', target) || []
    const injectionTokens: Record<string | symbol, any> =
      Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {}
    Object.keys(injectionTokens).forEach(key => {
      params[+key] = injectionTokens[key]
    })

    this.typeInfos.set(target, params)

    console.log(`[TYPE INFO] ${target.name} was injected with params ${params}`)
  }

  injectProperty = (token: string | symbol, target: any, parameterIndex: number) => {
    const injectionTokens =
      Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {}
    injectionTokens[parameterIndex] = token
    Reflect.defineMetadata(
      INJECTION_TOKEN_METADATA_KEY,
      injectionTokens,
      target
    )

    console.log(`[PROPERTY INJECT] Property ${target} was injected with token ${token.toString()}`)
  }

  hasInjectionsMetadata = (target: Constructor<any>): boolean => {
    return Reflect.hasMetadata(INJECTION_TOKEN_METADATA_KEY, target)
  }

  getInjectionsMetadata = (target: Constructor<any>): Record<string, unknown> => {
    return Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target)
  }

  public resolve = <T> (target: Constructor<T>): T => {

    const classInstance = this.generateInstance(target)
    const metadata = this.getInjectionsMetadata(target)

    if (metadata) {
      for (const metaIndex in metadata) {

        const index = parseInt(metaIndex)
        const metaKey = metadata[index] as any
        const targetKey = Object.keys(classInstance)[index]

        const classInfo = this.registers.get(metaKey)
        if (!classInfo) {
          throw new Error(`[INJECT RESOLVER] ClassInfo not known for ${target.name} on key ${targetKey} by metadata ${metaKey}`)
        }

        const newValue = new classInfo()
        classInstance[targetKey] = newValue
      }
    }

    this.typeInfos.set(target, classInstance)

    console.log(`[INJECT RESOLVER] Created class ${classInstance.constructor.name}`)

    return classInstance
  }

  generateInstance = (target: Constructor<any>): any => {
    const typeInfo = this.typeInfos.get(target)

    if (!typeInfo || typeInfo.length === 0) {
      if (target.length === 0) {
        return new target()
      } else if (typeInfo && !(typeInfo instanceof Array)) {
        return typeInfo
      } else {
        throw new Error(`[INJECT RESOLVER] TypeInfo not known for ${target.name}`)
      }
    } else {
      return new target()
    }
  }
}

export default new Injector()