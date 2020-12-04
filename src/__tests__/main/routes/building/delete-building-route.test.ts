import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { deleteBuildingPath } from '@/main/routes'

describe(`DeleteBuilding Route > ${deleteBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: deleteBuildingPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
  })

  const makeURN = (): string => deleteBuildingPath
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
      .delete(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .expect(HttpStatusCode.OK)
  })
})