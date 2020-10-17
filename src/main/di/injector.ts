/**
 * Based on: https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
 * Repository: https://github.com/ova2/frontend-tooling-tutorial/tree/master/typescript-playground/dependency-injection-container
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'

interface Type<T> {
  new(...args: any[]): T
}

/**
 * Decorator function to annotate classes which can inject another ones in constructors.
 * A decorator is required to be able to get Reflect's metadata.
 */
export const InjectableClass = (): (target: Type<any>) => void => {
  return (target: Type<any>) => {
    // do something if needed
  }
}

/**
 * Every entry point class instance starts its own dependency container.
 * Injector ensures that all decorated classes in the container are singletons.
 */
class Injector extends Map {

  public resolve = <T> (target: Type<any>): T => {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || []
    const injections = tokens.map((token: Type<any>) => this.resolve<any>(token))

    const classInstance = this.get(target)
    if (classInstance) {
      return classInstance
    }

    const newClassInstance = new target(...injections)
    this.set(target, newClassInstance)

    console.log(`Injector created class ${newClassInstance.constructor.name}`)

    return newClassInstance
  }
}

export default new Injector()