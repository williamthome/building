import { bootstrap, InjectableClass } from './di-container'

@InjectableClass()
export class Foo {
  doFooStuff() {
    console.log('foo')
  }
}

@InjectableClass()
export class Bar {
  constructor (
    public readonly foo: Foo
  ) {}

  doBarStuff() {
    console.log('bar')
  }
}

@InjectableClass()
export class Foobar {
  constructor (
    public readonly foo: Foo,
    public readonly bar: Bar
  ) {}
}

describe('Injector', () => {
  fit('should inject dependencies', () => {
    const [foobar] = bootstrap<Foobar>(Foobar)

    expect(foobar).toBeTruthy()
    expect(foobar.foo).toBeTruthy()
    expect(foobar.bar).toBeTruthy()

    expect(foobar.foo.doFooStuff).not.toThrow()
    expect(foobar.bar.doBarStuff).not.toThrow()
    expect(foobar.bar.foo.doFooStuff).not.toThrow()
  })
})