import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { updateUserActiveCompanyPath } from '@/main/routes'

xdescribe(`UpdateUserActiveCompany Route > ${updateUserActiveCompanyPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: updateUserActiveCompanyPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
  })

  const makeURN = (): string => updateUserActiveCompanyPath.fillURN()
    .params({ companyId: mongoUtils.company.id })
    .urn

  it('shold return no content', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await mongoUtils.verify()
    await mongoUtils.addPlan()
    await mongoUtils.addCompany()
    await request(mongoUtils.webServer.server())
      .patch(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .expect(HttpStatusCode.NO_CONTENT)
  })
})