import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addCompanyPath } from '@/main/routes'

describe(`AddCompany Route > ${addCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: addCompanyPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
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