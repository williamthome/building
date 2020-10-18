export type Constructor<T> = {
  new(...args: any[]): T
}

export interface InjectorAdapter {
  Injectable: <T> () => (target: Constructor<T>) => void
  isClassRegistered: <T> (target: Constructor<T>) => boolean
  Inject: <T> (token: string | symbol) => (target: Constructor<T>, propertyKey: string | symbol, parameterIndex: number) => void
  isPropertyRegistered: <T> (token: string | symbol) => boolean
  resolve: <T> (target: Constructor<T>) => T
  clearInstances: () => void
  registerProperty: <T> (token: string | symbol, value: T) => void
}