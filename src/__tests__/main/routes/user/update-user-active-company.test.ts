import request from 'supertest'
import { addCompany, addUserAndAuthenticate, config, db, mongoInMemory, webServer } from '@/__tests__/shared/mongodb-server.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockAuthorizationToken } from '@/__tests__/presentation/__mocks__'

describe('UpdateUserActiveCompany Route > PATCH /user/activeCompany/:companyId', () => {
  beforeAll(async () => {
    await config()
    await webServer().listen()
    await db().connect()
  })

  beforeEach(async () => {
    await db().clearCollection('companies')
    await db().clearCollection('users')
  })

  afterAll(async () => {
    await db().disconnect()
    await webServer().close()
    await mongoInMemory().stop()
  })

  xit('shold return no content', async () => {
    const { authenticatedUser, accessToken } = await addUserAndAuthenticate()
    const { company } = await addCompany(authenticatedUser)
    return await request(webServer().server())
      .patch(`/user/activeCompany/${company.id}`)
      .set(HttpHeaderName.AUTHORIZATION, mockAuthorizationToken(accessToken))
      .expect(HttpStatusCode.NO_CONTENT)
  })
})