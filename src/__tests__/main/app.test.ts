import { Server } from '@/main/server'

//#region Factories

let server: Server

beforeEach(async (done) => {
  server = await new Server().config()
  await server.run()
  done()
})

afterEach(async (done) => {
  await server.app.stop()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  done()
})

//#endregion Factories

describe('Application', () => {
  it('should run and after stop', async () => {
    expect(server.app.isHealthy()).toBe(true)
    await server.app.stop()
    expect(server.app.isHealthy()).toBe(false)
  })
})