import 'reflect-metadata'
import {
  container,
  Injectable,
  isClassRegistered,
  Inject,
  isPropertyRegistered,
  resolve,
  clearInstances,
  registerProperty,
  registerClass
} from './tsyringe'

type IFoo = { kind: string, doStuff: () => void }
type IBar = IFoo & { foo: IFoo }
type IFoobar = IFoo & { foo: IFoo, bar: IBar }

@Injectable()
class Foo implements IFoo {
  kind = 'foo'

  doStuff = (): void => {
    console.log('foo')
  }
}

@Injectable()
class Bar implements IBar {
  kind = 'bar'

  constructor (
    public readonly foo: IFoo
  ) { }

  doStuff = (): void => {
    console.log('bar')
  }
}

@Injectable()
class Foobar implements IFoobar {
  kind = 'foobar'

  constructor (
    public readonly foo: IFoo,
    public readonly bar: IBar,
    @Inject('foobar') public readonly fobar: string
  ) { }

  doStuff = (): void => {
    console.log('foobar')
  }
}

describe('TSyringe InjectorAdapter', () => {
  beforeEach(() => {
    container.clearInstances()
  })

  describe('@Injectable()', () => {
    it('should have injected classes', () => {
      expect(isClassRegistered(Foo)).toBeTruthy()
      expect(isClassRegistered(Bar)).toBeTruthy()
      expect(isClassRegistered(Foobar)).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('should inject properties', () => {
      expect(isPropertyRegistered('foobar')).toBeTruthy()
    })
  })

  describe('resolve()', () => {
    it('should resolve', () => {
      const foo = resolve<Foo>(Foo)
      expect(foo).toBeTruthy()
      expect(foo.doStuff).not.toThrow()
    })
  })

  describe('registerProperty()', () => {
    it('should register an property', () => {
      registerProperty<string>('any', 'value')
      expect(isPropertyRegistered('any')).toBeTruthy()
    })
  })

  describe('clearInstances()', () => {
    it('should clear instances', () => {
      registerProperty<string>('any', 'value')
      expect(isPropertyRegistered('any')).toBeTruthy()
      clearInstances()
      expect(isPropertyRegistered('any')).toBeFalsy()
    })
  })

  describe('registerClass()', () => {
    it('should register an class', () => {
      registerClass<Foo>('foo', Foo)
      expect(isPropertyRegistered('foo')).toBeTruthy()
    })
  })
})