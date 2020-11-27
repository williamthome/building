import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockAuthDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'

describe('Authentication Route > POST /login', () => {
  beforeAll(async () => {
    await mongoUtils.config()
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
  })

  it('shold return ok', async () => {
    const authDto = mockAuthDto()
    await mongoUtils.addUser(authDto)
    await request(mongoUtils.webServer.server())
      .post('/login')
      .send(authDto)
      .expect(HttpStatusCode.OK)
  })
})