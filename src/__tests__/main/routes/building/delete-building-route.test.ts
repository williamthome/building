import request from 'supertest'
import {
  addBuilding, addCompany, addUserAndAuthenticate,
  config, db, mongoInMemory, webServer
} from '@/__tests__/shared/mongodb-server.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockAuthorizationToken } from '@/__tests__/presentation/__mocks__'

describe('DeleteBuilding Route > DELETE /building/:id', () => {
  beforeAll(async () => {
    await config()
    await webServer().listen()
    await db().connect()
  })

  beforeEach(async () => {
    await db().clearCollection('buildings')
    await db().clearCollection('companies')
    await db().clearCollection('users')
  })

  afterAll(async () => {
    await db().disconnect()
    await webServer().close()
    await mongoInMemory().stop()
  })

  it('shold return ok', async () => {
    const { authenticatedUser, accessToken } = await addUserAndAuthenticate()
    const { company } = await addCompany(authenticatedUser)
    const { building } = await addBuilding(company.id)
    await request(webServer().server())
      .delete(`/building/${building.id}`)
      .set(HttpHeaderName.AUTHORIZATION, mockAuthorizationToken(accessToken))
      .expect(HttpStatusCode.OK)
  })
})