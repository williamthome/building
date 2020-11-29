import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockBuildingEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { updateBuildingPath } from '@/main/routes'

describe(`UpdateBuilding Route > ${updateBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: updateBuildingPath })
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('buildings')
    await mongoUtils.db.clearCollection('companies')
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
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
      .send(mockBuildingEntityDto())
      .expect(HttpStatusCode.OK)
  })
})