import request from 'supertest'
import { addUserAndAuthenticate, config, db, mongoInMemory, webServer } from '@/__tests__/shared/mongodb-server.utils'
import { makeBearer } from '../../helpers/route.helper'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'

describe('UpdateUser Route > PATCH /user/:id', () => {
  beforeAll(async () => {
    await config()
    await db().connect()
  })

  beforeEach(async () => {
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
    const { user, accessToken } = await addUserAndAuthenticate()
    await request(webServer().server())
      .patch(`/user/${user.id}`)
      .set(HttpHeaderName.AUTHORIZATION, makeBearer(accessToken))
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})