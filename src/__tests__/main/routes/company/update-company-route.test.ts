import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { updateCompanyPath } from '@/main/routes'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateCompanyDto } from '@/__tests__/domain/__mocks__/entities'

describe(`UpdateCompany Route > ${updateCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: updateCompanyPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  it('shold return ok', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await dbUtils.verify()
    await dbUtils.addPlan()
    await dbUtils.addCompany()
    const { planId, ...dto } = mockCreateCompanyDto({ planId: dbUtils.plan.id })
    await request(dbUtils.webServer.server())
      .patch(updateCompanyPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .send(dto)
      .expect(HttpStatusCode.OK)
  })
})