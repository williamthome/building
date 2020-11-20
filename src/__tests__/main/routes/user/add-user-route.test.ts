import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { server, config, run, stop } from '@/__tests__/shared/server.utils.ts'

describe('AddUser Route > POST /user', () => {
  beforeAll(async (done) => {
    await config()
    done()
  })

  beforeEach(async (done) => {
    await run()
    done()
  })

  afterEach(async (done) => {
    await stop()
    done()
  })

  it('shold return ok', async () => {
    await request(server.app.webServer.server())
      .post('/user')
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})
