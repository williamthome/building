import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'

describe('UpdateUser Route > PATCH /user', () => {
  beforeAll(async () => {
    await mongoUtils.config()
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('companies')
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
  })

  it('shold return ok', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await request(mongoUtils.webServer.server())
      .patch('/user')
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})