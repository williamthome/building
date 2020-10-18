import { container } from 'tsyringe'
import { Constructor, InjectorAdapter } from '../../adapters/injector.adapter'

const TSyringe = new class implements InjectorAdapter {
  injectable = <T>() => {
    return (target: Constructor<T>): void => {
      container.registerSingleton<T>(target)

      console.log(`[INJECTABLE] ${target.name} registered as singleton`)
    }
  }

  isClassRegistered = <T> (target: Constructor<T>): boolean => {
    return container.isRegistered<T>(target)
  }

  inject = <T> (token: string | symbol) => {
    return (target: Constructor<T>, propertyKey: string | symbol, parameterIndex: number): void => {
      container.register(token, target)

      console.log(`[INJECT] Token ${token.toString()} registered for ${target.name}`)
    }
  }

  isPropertyRegistered = <T> (token: string | symbol): boolean => {
    return container.isRegistered<T>(token)
  }

  resolve = <T> (target: Constructor<T> | string | symbol): T => {
    const resolved = container.resolve<T>(target)

    console.log(`[RESOLVE] ${typeof target === 'symbol' || typeof target === 'symbol' ? target.toString() : target } resolved for ${typeof resolved === 'object' ? (resolved as any).constructor.name : resolved}`)

    return resolved
  }

  clearInstances = (): void => {
    container.clearInstances()
  }
}

const {
  injectable,
  inject,
  isClassRegistered,
  isPropertyRegistered,
  resolve,
  clearInstances
} = TSyringe

export {
  TSyringe as container,
  injectable,
  inject,
  isClassRegistered,
  isPropertyRegistered,
  resolve,
  clearInstances
}