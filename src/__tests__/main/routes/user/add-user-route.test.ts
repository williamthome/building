import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { config, db, mongoInMemory, webServer } from '@/__tests__/shared/mongodb-server.utils'

describe('AddUser Route > POST /user', () => {
  beforeAll(async () => {
    await config()
    await webServer().listen()
    await db().connect()
  })

  beforeEach(async () => {
    await db().clearCollection('users')
  })

  afterAll(async () => {
    await db().disconnect()
    await webServer().close()
    await mongoInMemory().stop()
  })

  it('shold return ok', async () => {
    await request(webServer().server())
      .post('/user')
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})