import 'reflect-metadata'
import dinjector, { Injectable, Inject } from '..'

interface Database {}

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

  describe('@Injectable()', () => {
    it('shold inject', () => {
      expect(dinjector.tokens.getTokenDefinitions(Express)).toBeTruthy()
      expect(dinjector.tokens.getTokenDefinitions('db')).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('shold inject', () => {
      expect(dinjector.tokens.getTokenDefinitions('PORT')).toBeTruthy()
      expect(dinjector.tokens.getTokenDefinitions('dbUrl')).toBeTruthy()
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

    fit('shold resolve dependencies', async () => {
      const app = await dinjector.resolve(App)
      expect(app.db).toBeTruthy()
    })
  })
})