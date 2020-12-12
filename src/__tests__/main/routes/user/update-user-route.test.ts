import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'
import { updateUserPath } from '@/main/routes'

describe(`UpdateUser Route > ${updateUserPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: updateUserPath })
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
    await request(mongoUtils.webServer.server())
      .patch(updateUserPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .send(mockCreateUserDto())
      .expect(HttpStatusCode.OK)
  })
})