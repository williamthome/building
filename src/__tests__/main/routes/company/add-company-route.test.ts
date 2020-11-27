import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'

describe('AddCompany Route > POST /company', () => {
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
    await mongoUtils.verify()
    await request(mongoUtils.webServer.server())
      .post('/company')
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCompanyEntityDto())
      .expect(HttpStatusCode.OK)
  })
})