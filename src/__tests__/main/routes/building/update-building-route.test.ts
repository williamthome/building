import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateBuildingDto } from '@/__tests__/domain/__mocks__/entities'
import { updateBuildingPath } from '@/main/routes'

describe(`UpdateBuilding Route > ${updateBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: updateBuildingPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
  })

  const makeURN = (): string => updateBuildingPath
    .fillURN()
    .params({ id: mongoUtils.building.id })
    .urn

  it('shold return ok', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await mongoUtils.verify()
    await mongoUtils.addPlan()
    await mongoUtils.addCompany()
    await mongoUtils.addBuilding()
    await request(mongoUtils.webServer.server())
      .patch(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCreateBuildingDto())
      .expect(HttpStatusCode.OK)
  })
})