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
      expect(dinjector.tokens.getTokenDefinitionsByConstructor(Express)).toBeTruthy()
      expect(dinjector.tokens.getTokenDefinitionsByAlias('db')).toBeTruthy()
    })
  })

  describe('@Inject()', () => {
    it('shold inject', () => {
      expect(dinjector.tokens.getTokenDefinitionsByAlias('PORT')).toBeTruthy()
      expect(dinjector.tokens.getTokenDefinitionsByAlias('dbUrl')).toBeTruthy()
    })
  })

  describe('resolve()', () => {
    it('shold not throw', async () => {
      await expect(dinjector.resolve(Express)).resolves.not.toThrow()
    })
  })
})