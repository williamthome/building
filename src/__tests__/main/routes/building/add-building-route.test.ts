import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockBuildingEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addBuildingPath } from '@/main/routes'

describe(`AddBuilding Route > ${addBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: addBuildingPath })
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('buildings')
    await mongoUtils.db.clearCollection('companies')
    await mongoUtils.db.clearCollection('plans')
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
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
      .send(mockBuildingEntityDto())
      .expect(HttpStatusCode.OK)
  })
})