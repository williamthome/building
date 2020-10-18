import { Inject } from './decorators/inject.decorator'
import { Injectable } from './decorators/injectable.decorator'
import { Registry } from './decorators/registry.decorator'
import injector from './injector'

type IFoo = { kind: string, doStuff: () => void }
type IBar = IFoo & { foo: IFoo }
type IFoobar = IFoo & { foo: IFoo, bar: IBar }

@Registry('Foo')
class Foo implements IFoo {
  kind = 'foo'

  doStuff = (): void => {
    console.log('foo')
  }
}

@Registry('Bar')
class Bar implements IBar {
  kind = 'bar'

  constructor (
    public readonly foo: IFoo
  ) { }

  doStuff = (): void => {
    console.log('bar')
  }
}

@Registry('Foobar')
@Injectable()
class Foobar implements IFoobar {
  kind = 'foobar'

  constructor (
    @Inject('Foo') public readonly foo: IFoo,
    @Inject('Bar') public readonly bar: IBar,
  ) { }

  doStuff = (): void => {
    console.log('foobar')
  }
}


describe('Injector', () => {
  describe('Registry', () => {
    it('should register', () => {
      expect(injector.registers.has('Foo')).toBeTruthy()
      expect(injector.registers.has('Bar')).toBeTruthy()
      expect(injector.registers.has('Foobar')).toBeTruthy()
    })

    it('should throw if token is already registered', () => {
      expect(() => { injector.registerClass('Foo', Foo) }).toThrow()
    })
  })

  describe('Injectable', () => {
    it('should have injected classes', () => {
      expect(injector.typeInfos.has(Foobar)).toBeTruthy()
    })
  })

  describe('Inject', () => {
    it('should have injected properties', () => {
      expect(injector.hasInjectionsMetadata(Foobar)).toBeTruthy()
    })
  })

  describe('Resolve', () => {
    fit('should have resolved injections', () => {
      const foobar = injector.resolve<Foobar>(Foobar)

      expect(foobar).toBeTruthy()
      expect(foobar.foo).toBeTruthy()
      expect(foobar.bar).toBeTruthy()

      expect(foobar.kind).toBe('foobar')
      expect(foobar.foo.kind).toBe('foo')
      expect(foobar.bar.kind).toBe('bar')
    })
  })
})