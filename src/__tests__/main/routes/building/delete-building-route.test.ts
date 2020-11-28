import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { deleteBuildingPath } from '@/main/routes'

describe(`DeleteBuilding Route > ${deleteBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: deleteBuildingPath })
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

  const makeURN = (): string => deleteBuildingPath
    .fillURN()
    .params({ id: mongoUtils.building.id })
    .urn

  it('shold return ok', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await mongoUtils.verify()
    await mongoUtils.addCompany()
    await mongoUtils.addBuilding()
    await request(mongoUtils.webServer.server())
      .delete(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .expect(HttpStatusCode.OK)
  })
})