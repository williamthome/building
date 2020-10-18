/**
 * Inspired by https://github.com/microsoft/tsyringe
 */

if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
  throw new Error(
    'Injector requires a reflect polyfill. Please add \'import "reflect-metadata"\' to the top of your entry point.'
  )
}

import { isConstructor } from '../utils/object/is-constructor'
import { INJECTION_TOKEN_METADATA_KEY, NATIVE_OBJECTS_TYPES } from './helpers/constants'
import { Constructor, InjectionToken } from './protocols'

export default new class {
  registers = new Map<any, any>()
  instances = new Map<any, any[]>()

  /**
   * RESOLVE
   */
  resolve = <T> (toResolve: Constructor<T> | string): T => {
    let target: Constructor<T> | undefined = undefined

    if (typeof toResolve === 'string') {
      this.registers.forEach((value, key) => {
        const toFind = typeof key === 'string' ? key : key.name
        if (toFind === toResolve) {
          target = value
          return
        }
      })
    } else {
      target = toResolve
    }

    if (!target) {
      throw new Error(`{RESOLVE] Unable to resolve ${toResolve}`)
    }

    const targetInjectedTokens = Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {}
    const injectedTokens: InjectionToken = targetInjectedTokens

    const newInstance = isConstructor(target) ? new target() as any : target

    for (const [toFind, toSet] of Object.entries(injectedTokens)) {
      const isNativeObjectType = NATIVE_OBJECTS_TYPES.some(
        type => toSet && typeof toSet === 'string' && type === toSet.toLowerCase()
      )

      const registryValue = this.registers.get(isNativeObjectType ? toFind : toSet)
      if (!registryValue) {
        throw new Error(`Token ${toFind} for ${target} not registered`)
      }

      const newValue = isConstructor(registryValue) ? new registryValue() : registryValue

      if (!isNativeObjectType) {
        const instancesOfType = this.instances.get(toSet) || []
        for (const instance of instancesOfType) {

          const resolved = this.resolve(instance)
          Object.assign(instance, resolved)

          newInstance[toFind] = instance
        }
      } else {
        newInstance[toFind] = newValue
      }
    }

    this.registers.set(target, newInstance)

    console.log(`[RESOLVE] ${target.name} ands nested components resolved`)

    return newInstance
  }
}