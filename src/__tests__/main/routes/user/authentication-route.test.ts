import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockAuthentication, mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { authenticationPath } from '@/main/routes'

describe(`Authentication Route > ${authenticationPath.describe}`, () => {
  beforeAll(async () => {
    await mongoUtils.run({ routePath: authenticationPath })
  })

  beforeEach(async () => {
    await mongoUtils.clearCollections()
  })

  afterAll(async () => {
    await mongoUtils.stop()
  })

  it('shold return ok', async () => {
    const authDto = mockAuthentication()
    await mongoUtils.addUser({
      email: authDto.email,
      password: authDto.password
    })
    await request(mongoUtils.webServer.server())
      .post(authenticationPath.urn)
      .send(authDto)
      .expect(HttpStatusCode.OK)
  })
})