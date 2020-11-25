import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { addCompany, addUserAndAuthenticate, config, db, mongoInMemory, webServer } from '@/__tests__/shared/mongodb-server.utils'
import { mockAuthorizationToken } from '@/__tests__/presentation/__mocks__'

describe('AddCompany Route > POST /company', () => {
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

  it('shold return ok', async () => {
    const { authenticatedUser, accessToken } = await addUserAndAuthenticate()
    await addCompany(authenticatedUser)
    await request(webServer().server())
      .post('/company')
      .set(HttpHeaderName.AUTHORIZATION, mockAuthorizationToken(accessToken))
      .send(mockCompanyEntityDto())
      .expect(HttpStatusCode.OK)
  })
})