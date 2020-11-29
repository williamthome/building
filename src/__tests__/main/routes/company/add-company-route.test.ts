import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addCompanyPath } from '@/main/routes'

describe(`AddCompany Route > ${addCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: addCompanyPath })
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
    await request(mongoUtils.webServer.server())
      .post(addCompanyPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCompanyEntityDto({ planId: mongoUtils.plan.id }))
      .expect(HttpStatusCode.OK)
  })
})