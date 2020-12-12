import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateCompanyDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { updateCompanyPath } from '@/main/routes'

describe(`UpdateCompany Route > ${updateCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: updateCompanyPath })
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
    await mongoUtils.addCompany()
    const { planId, ...dto } = mockCreateCompanyDto({ planId: mongoUtils.plan.id })
    await request(mongoUtils.webServer.server())
      .patch(updateCompanyPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(dto)
      .expect(HttpStatusCode.OK)
  })
})