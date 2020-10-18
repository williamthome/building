import 'reflect-metadata'
import {
  container,
  injectable,
  isClassRegistered,
  inject,
  isPropertyRegistered,
  resolve
} from './tsyringe'

type IFoo = { kind: string, doStuff: () => void }
type IBar = IFoo & { foo: IFoo }
type IFoobar = IFoo & { foo: IFoo, bar: IBar }

@injectable()
class Foo implements IFoo {
  kind = 'foo'

  doStuff = (): void => {
    console.log('foo')
  }
}

@injectable()
class Bar implements IBar {
  kind = 'bar'

  constructor (
    public readonly foo: IFoo
  ) { }

  doStuff = (): void => {
    console.log('bar')
  }
}

@injectable()
class Foobar implements IFoobar {
  kind = 'foobar'

  constructor (
    public readonly foo: IFoo,
    public readonly bar: IBar,
    @inject('foobar') public readonly fobar: string
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
})