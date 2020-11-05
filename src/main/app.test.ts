import { App } from './protocols'
import { Server } from './server'

//#region Factories

let app: App

beforeEach(async (done) => {
  const server = await new Server().config()
  app = await server.run()
  done()
})

afterEach(async (done) => {
  await app.stop()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  done()
})

//#endregion Factories

describe('Application', () => {
  it('should run and after stop', async () => {
    expect(app.isHealthy()).toBe(true)
    await app.stop()
    expect(app.isHealthy()).toBe(false)
  })
})