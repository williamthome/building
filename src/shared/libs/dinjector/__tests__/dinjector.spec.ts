import dinjector, { Injectable, Inject } from '..'

interface Database {
  dbUrl: string
  updateSome: (thing: any) => Promise<any>
}

class Express {
  constructor (
    public readonly port: number,
    public readonly host: string
  ) {}
}

class MySQL implements Database {
  constructor (
    public readonly dbUrl: string
  ) {}

  updateSome = (thing: any): Promise<any> => {
    return new Promise(resolve => resolve(thing))
  }
}

class App {
  constructor (
    public readonly db: Database
  ) {}
}

describe('DInjector', () => {

  beforeEach(() => {
    Inject()(Express, 'host', 1)
    Inject({ alias: 'PORT' })(Express, 'port', 0)
    Injectable()(Express)

    Inject()(MySQL, 'dbUrl', 0)
    Injectable({ alias: 'db' })(MySQL)

    Inject()(App, 'db', 0)
    Injectable()(App)
  })

  afterEach(() => {
    dinjector.reset()
  })

  describe('@Injectable()', () => {
    it('shold inject', () => {
      expect(dinjector.get(Express)).toBeTruthy()
      expect(dinjector.get('db')).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('shold inject', () => {
      expect(dinjector.getByAlias('PORT')).toBeTruthy()
      expect(dinjector.getByAlias('dbUrl')).toBeTruthy()
    })
  })

  describe('resolve()', () => {
    it('shold not throw', async () => {
      await expect(dinjector.resolve(Express)).resolves.not.toThrow()
    })

    it('shold return truthy', async () => {
      dinjector.setValue('PORT', 'newvalue')
      const resolved = await dinjector.resolve(Express)
      expect(resolved).toBeTruthy()
    })

    it('shold update properties', async () => {
      dinjector.setValue('PORT', 666)
      dinjector.setValue('host', 'fromHell')

      const express = await dinjector.resolve(Express)

      expect(express.port).toBe(666)
      expect(express.host).toBe('fromHell')
    })

    it('shold resolve dependencies', async () => {
      const app = await dinjector.resolve(App)
      expect(app.db).toBeTruthy()
    })

    it('shold define resolved dependencies properties', async () => {
      dinjector.setValue('dbUrl', 'dbUrl/mydb')
      const app = await dinjector.resolve(App)
      expect(app.db.dbUrl).toBe('dbUrl/mydb')
    })

    it('shold resolve by alias and constructor', async () => {
      await expect(dinjector.resolve<MySQL>('db')).resolves.toBeTruthy()
      await expect(dinjector.resolve<MySQL>(MySQL)).resolves.toBeTruthy()
    })

    fit('shold resolve constructor with args and functions', async () => {
      const sql = await dinjector.resolve<Database>(MySQL)
      await expect(sql.updateSome('toResolve')).resolves.not.toThrow()
    })
  })
})