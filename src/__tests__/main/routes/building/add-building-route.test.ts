import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateBuildingDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addBuildingPath } from '@/main/routes'

describe(`AddBuilding Route > ${addBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: addBuildingPath })
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
    await request(mongoUtils.webServer.server())
      .post(addBuildingPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCreateBuildingDto())
      .expect(HttpStatusCode.OK)
  })
})