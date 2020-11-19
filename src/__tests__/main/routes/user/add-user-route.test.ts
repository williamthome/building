import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { Server } from '@/main/server'

describe('AddUser Route > POST /user', () => {
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

  it('shold return ok', async () => {
    await request(server.app.webServer.server())
      .post('/user')
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})
