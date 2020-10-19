import 'reflect-metadata'
import dinjector, { Injectable, Inject } from '..'

interface Database {}

@Injectable()
class Express {
  constructor (
    @Inject({ alias: 'PORT' }) public readonly port: string
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
      const resolved = await dinjector.resolve(Express)
      expect(resolved).toBeTruthy()
    })
  })
})