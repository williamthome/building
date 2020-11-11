import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/presentation/__mocks__/user-entity-dto.mock'
import { Server } from '@/main/server'

describe('User Routes', () => {
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

  describe('POST /user', () => {
    it('shold return ok', async () => {
      await request(server.app.webServer.server())
        .post('/user')
        .send(mockUserEntityDto())
        .expect(HttpStatusCode.OK)
    })
  })
})
