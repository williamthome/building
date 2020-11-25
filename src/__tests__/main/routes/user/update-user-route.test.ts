import request from 'supertest'
import { addUserAndAuthenticate, config, db, mongoInMemory, webServer } from '@/__tests__/shared/mongodb-server.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { mockAuthorizationToken } from '@/__tests__/presentation/__mocks__'

describe('UpdateUser Route > PATCH /user', () => {
  beforeAll(async () => {
    await config()
    await db().connect()
  })

  beforeEach(async () => {
    await db().clearCollection('companies')
    await db().clearCollection('users')
    await webServer().listen()
  })

  afterEach(async () => {
    await webServer().close()
  })

  afterAll(async () => {
    await db().disconnect()
    await mongoInMemory().stop()
  })

  it('shold return ok', async () => {
    const { accessToken } = await addUserAndAuthenticate()
    await request(webServer().server())
      .patch('/user')
      .set(HttpHeaderName.AUTHORIZATION, mockAuthorizationToken(accessToken))
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})