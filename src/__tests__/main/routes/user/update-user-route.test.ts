import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'
import { updateUserPath } from '@/main/routes'

describe(`UpdateUser Route > ${updateUserPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: updateUserPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  it('shold return ok', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await request(dbUtils.webServer.server())
      .patch(updateUserPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .send(mockCreateUserDto())
      .expect(HttpStatusCode.OK)
  })
})
