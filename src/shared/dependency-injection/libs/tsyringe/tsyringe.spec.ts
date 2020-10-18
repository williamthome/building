import 'reflect-metadata'
import {
  container,
  Injectable,
  isClassRegistered,
  Inject,
  isPropertyRegistered,
  resolve
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

describe('TSyringe', () => {
  beforeEach(() => {
    container.clearInstances()
  })

  describe('Injectable', () => {
    it('should have injected classes', () => {
      expect(isClassRegistered(Foo)).toBeTruthy()
      expect(isClassRegistered(Bar)).toBeTruthy()
      expect(isClassRegistered(Foobar)).toBeTruthy()
    })
  })

  describe('Inject', () => {
    it('should inject properties', () => {
      expect(isPropertyRegistered('foobar')).toBeTruthy()
    })
  })

  describe('Resolve', () => {
    it('should resolve', () => {
      const foo = resolve<Foo>(Foo)
      expect(foo).toBeTruthy()
      expect(foo.doStuff).not.toThrow()
    })
  })

  describe('RegisterProperty', () => {
    fit('should register a property', () => {
      container.registerProperty<string>('any', 'value')
      expect(container.isPropertyRegistered('any')).toBeTruthy()
    })
  })
})