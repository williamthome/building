import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { updateUserActiveCompanyPath } from '@/main/routes'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'

xdescribe(`UpdateUserActiveCompany Route > ${updateUserActiveCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: updateUserActiveCompanyPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  const makeURN = (): string =>
    updateUserActiveCompanyPath.fillURN().params({ companyId: dbUtils.company.id }).urn

  it('shold return no content', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await dbUtils.verify()
    await dbUtils.addPlan()
    await dbUtils.addCompany()
    await request(dbUtils.webServer.server())
      .patch(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .expect(HttpStatusCode.NO_CONTENT)
  })
})
