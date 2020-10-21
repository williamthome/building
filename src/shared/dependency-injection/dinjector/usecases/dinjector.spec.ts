import 'reflect-metadata'
import dinjector, { Injectable, Inject } from '..'

interface Database {
  dbUrl: string
}

@Injectable()
class Express {
  constructor (
    @Inject({ alias: 'PORT' }) public readonly port: number,
    @Inject() public readonly host: string
  ) {}
}

@Injectable({
  alias: 'db'
})
class MySQL implements Database {
  constructor (
    @Inject() public readonly dbUrl: string
  ) {}
}

@Injectable()
class App {
  constructor (
    @Inject() public readonly db: Database
  ) {}
}

describe('DInjector', () => {

  it('shold inject', () => {
    dinjector.setValue('PORT', 666)
    dinjector.setValue('dbUrl', 'myDbUrl')

    const sqlByAlias = dinjector.resolve<MySQL>('db')
    const sqlByConstructor = dinjector.resolve<MySQL>(MySQL)
    const sqlByName = dinjector.resolve<MySQL>('MySQL')

    const expressByConstructor = dinjector.resolve<Express>(Express)

    const appByConstructor = dinjector.resolve<App>(App)

    dinjector.setValue('host', 'anyHost')

    const d = dinjector.all()
  })

  /*
  describe('@Injectable()', () => {
    it('shold inject', () => {
      expect(dinjector.getToken(Express)).toBeTruthy()
      expect(dinjector.getToken('db')).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('shold inject', () => {
      expect(dinjector.getToken('PORT')).toBeTruthy()
      expect(dinjector.getToken('dbUrl')).toBeTruthy()
    })
  })

  describe('defineProperty()', () => {
    fit('shold define a property', () => {
      dinjector.defineProperty<string>('dbUrl', 'myDbUrl')
    })
  })

  /*
  describe('@Injectable()', () => {
    it('shold inject', () => {
      expect(dinjector.tokens.getDefinitions(Express)).toBeTruthy()
      expect(dinjector.tokens.getDefinitions('db')).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('shold inject', () => {
      expect(dinjector.tokens.getDefinitions('PORT')).toBeTruthy()
      expect(dinjector.tokens.getDefinitions('dbUrl')).toBeTruthy()
    })
  })

  describe('resolve()', () => {
    it('shold not throw', async () => {
      await expect(dinjector.resolve(Express)).resolves.not.toThrow()
    })

    it('shold return truthy', async () => {
      dinjector.defineProperty('PORT', 'newvalue')
      const resolved = await dinjector.resolve(Express)
      expect(resolved).toBeTruthy()
    })

    it('shold update properties', async () => {
      dinjector.defineProperty('PORT', 666)
      dinjector.defineProperty('host', 'fromHell')

      const express = await dinjector.resolve(Express)

      expect(express.port).toBe(666)
      expect(express.host).toBe('fromHell')
    })

    it('shold resolve dependencies', async () => {
      const app = await dinjector.resolve(App)
      expect(app.db).toBeTruthy()
    })

    fit('shold define resolved dependencies properties', async () => {
      dinjector.defineProperty('dbUrl', 'dbUrl/mydb')
      const app = await dinjector.resolve(App)
      // expect(app.db.dbUrl).toBe('dbUrl/mydb')
    })
  })
  */
})