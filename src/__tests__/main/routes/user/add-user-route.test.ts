import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { addUserPath } from '@/main/routes'

describe(`AddUser Route > ${addUserPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: addUserPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
  })

  it('shold return ok', async () => {
    await request(mongoUtils.webServer.server())
      .post(addUserPath.urn)
      .send(mockCreateUserDto())
      .expect(HttpStatusCode.OK)
  })
})