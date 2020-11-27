import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'

describe('AddUser Route > POST /user', () => {
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
    await request(mongoUtils.webServer.server())
      .post('/user')
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})