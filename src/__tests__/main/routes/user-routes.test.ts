import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/presentation/__mocks__/user-entity-dto.mock'
import { App } from '@/main/protocols'
import { Server } from '@/main/server'

describe('User Routes', () => {
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

  describe('POST /user', () => {
    it('shold return ok', async () => {
      await request(app.webServer.server())
        .post('/user')
        .send(mockUserEntityDto())
        .expect(HttpStatusCode.OK)
    })
  })
})
