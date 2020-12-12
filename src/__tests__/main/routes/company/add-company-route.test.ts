import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { addCompanyPath } from '@/main/routes'
import { mockCreateCompanyDto } from '@/__tests__/domain/__mocks__/entities'

describe(`AddCompany Route > ${addCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: addCompanyPath })
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
    await request(dbUtils.webServer.server())
      .post(addCompanyPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .send(mockCreateCompanyDto({
        planId: dbUtils.plan.id
      }))
      .expect(HttpStatusCode.OK)
  })
})