import request from 'supertest'
import { server, db, config, run, stop, addUserAndAuthenticate } from '@/__tests__/shared/mongodb-server.utils'
import { makeBearer } from '../../helpers/route.helper'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'

describe('UpdateUser Route > PATCH /user/:id', () => {
  beforeAll(async (done) => {
    await config()
    done()
  })

  beforeEach(async (done) => {
    await run()
    await db.clearCollection('users')
    done()
  })

  afterEach(async (done) => {
    await stop()
    done()
  })

  it('shold return ok', async () => {
    const { user, accessToken } = await addUserAndAuthenticate()
    await request(server.app.webServer.server())
      .patch(`/user/${user.id}`)
      .set(HttpHeaderName.AUTHORIZATION, makeBearer(accessToken))
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})
