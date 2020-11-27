import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockBuildingEntityDto } from '@/__tests__/domain/__mocks__/entities'

describe('UpdateBuilding Route > PATCH /building/:id', () => {
  beforeAll(async () => {
    await mongoUtils.config()
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

  it('shold return ok', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await mongoUtils.verify()
    await mongoUtils.addCompany()
    await mongoUtils.addBuilding()
    await request(mongoUtils.webServer.server())
      .patch(`/building/${mongoUtils.building.id}`)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockBuildingEntityDto())
      .expect(HttpStatusCode.OK)
  })
})