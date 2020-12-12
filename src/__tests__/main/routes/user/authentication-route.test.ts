import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { authenticationPath } from '@/main/routes'
import { HttpStatusCode } from '@/presentation/constants'
import { mockAuthentication, mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'

describe(`Authentication Route > ${authenticationPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: authenticationPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  it('shold return ok', async () => {
    const authDto = mockAuthentication()
    await dbUtils.addUser({
      email: authDto.email,
      password: authDto.password
    })
    await request(dbUtils.webServer.server())
      .post(authenticationPath.urn)
      .send(authDto)
      .expect(HttpStatusCode.OK)
  })
})