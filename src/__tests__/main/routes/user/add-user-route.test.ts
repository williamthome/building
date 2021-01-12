import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { addUserPath } from '@/main/routes'
import { HttpStatusCode } from '@/presentation/constants'
import { mockCreateUserDto } from '@/__tests__/domain/__mocks__/entities'

describe(`AddUser Route > ${addUserPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: addUserPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  it('shold return ok', async () => {
    await request(dbUtils.webServer.server())
      .post(addUserPath.urn)
      .send(mockCreateUserDto())
      .expect(HttpStatusCode.OK)
  })
})
