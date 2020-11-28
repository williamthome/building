import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addUserPath } from '@/main/routes'

describe(`AddUser Route > ${addUserPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.config({ routePath: addUserPath })
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
  })

  it('shold return ok', async () => {
    await request(mongoUtils.webServer.server())
      .post(addUserPath.urn)
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})