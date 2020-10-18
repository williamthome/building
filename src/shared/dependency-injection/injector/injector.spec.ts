import 'reflect-metadata'
import { objectComparer } from '../utils/object/comparer/object.comparer'
import { Inject, Injectable } from './decorators'
import injector from './injector'

//#region Factories

@Injectable() class Foo {
  constructor (
    @Inject public mustBeTruthy: boolean,
  ) { }
  doStuff = (): void => { console.log('do foo') }
}

@Injectable() class Bar {
  constructor (
    @Inject public foo: Foo,
  ) { }
  doStuff = (): void => { console.log('do bar') }
}

@Injectable() class Foobar {
  constructor (
    @Inject public foo: Foo,
    @Inject public bar: Bar,
    @Inject public foobar: string
  ) { }
  doStuff = (): void => { console.log('do foobar') }
}

//#endregion Factories

/**
 * TESTS
 */
describe('Injector', () => {
  it('should inject dependencies and not throw', () => {
    injector.registers.set('mustBeTruthy', true)
    injector.registers.set('foobar', 'foobar')

    const foo = injector.resolve<Foo>(Foo)
    const bar = injector.resolve<Bar>(Bar)
    const foobar = injector.resolve<Foobar>(Foobar)

    expect(foo).toBeTruthy()
    expect(foo.doStuff).not.toThrow()
    expect(foo.mustBeTruthy).toBe(true)
    expect(bar).toBeTruthy()
    expect(bar.doStuff).not.toThrow()
    expect(bar.foo.doStuff).not.toThrow()
    expect(bar.foo).toBeTruthy()
    expect(bar.foo.mustBeTruthy).toBe(true)
    expect(objectComparer(bar.foo, foo).equals).toBe(true)
    expect(foobar).toBeTruthy()
    expect(foobar.doStuff).not.toThrow()
    expect(foobar.bar.doStuff).not.toThrow()
    expect(foobar.bar.foo.doStuff).not.toThrow()
    expect(foobar.foo).toBeTruthy()
    expect(foobar.foo.mustBeTruthy).toBe(true)
    expect(foobar.bar).toBeTruthy()
    expect(foobar.bar.foo).toBeTruthy()
    expect(foobar.bar.foo.mustBeTruthy).toBe(true)
    expect(foobar.foobar).toBe('foobar')
    expect(objectComparer(foobar.bar.foo, foo).equals).toBe(true)
    expect(objectComparer(foobar.bar, bar).equals).toBe(true)
  })

  fit('should resolve by string', () => {
    injector.registers.set('mustBeTruthy', true)
    injector.registers.set('foobar', 'foobar')
    const foo = injector.resolve<Foo>('Foo')
    const bar = injector.resolve<Bar>('Bar')
    expect(foo).toBeTruthy()
    expect(bar).toBeTruthy()
  })
})