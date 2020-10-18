import { container } from 'tsyringe'
import { Constructor, InjectorAdapter } from '../../adapters/injector.adapter'

const TSyringe = new class implements InjectorAdapter {
  Injectable = <T>() => {
    return (target: Constructor<T>): void => {
      container.registerSingleton<T>(target)
      console.log(`[INJECTABLE] ${target.name} registered as singleton`)
    }
  }

  isClassRegistered = <T> (target: Constructor<T>): boolean => {
    return container.isRegistered<T>(target)
  }

  Inject = <T> (token: string | symbol) => {
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

  registerProperty = <T> (token: string | symbol, value: T): void => {
    container.register<T>(token, { useValue: value })
    console.log(`[REGISTER PROPERTY] Token ${token.toString()} registered as ${'value'}`)
  }

  registerClass = <T> (token: string | symbol, target: Constructor<T>): void => {
    container.register<T>(token, { useClass: target })
    console.log(`[REGISTER CLASS] Token ${token.toString()} registered for class ${target.name}`)
  }
}

const {
  Injectable,
  Inject,
  isClassRegistered,
  isPropertyRegistered,
  resolve,
  clearInstances,
  registerProperty,
  registerClass
} = TSyringe

export {
  TSyringe as container,
  Injectable,
  Inject,
  isClassRegistered,
  isPropertyRegistered,
  resolve,
  clearInstances,
  registerProperty,
  registerClass
}