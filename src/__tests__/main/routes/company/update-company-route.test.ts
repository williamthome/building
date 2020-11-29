import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { updateCompanyPath } from '@/main/routes'

describe(`UpdateCompany Route > ${updateCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: updateCompanyPath })
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('companies')
    await mongoUtils.db.clearCollection('plans')
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
    await mongoUtils.addPlan()
    await mongoUtils.addCompany()
    await request(mongoUtils.webServer.server())
      .patch(updateCompanyPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCompanyEntityDto())
      .expect(HttpStatusCode.OK)
  })
})