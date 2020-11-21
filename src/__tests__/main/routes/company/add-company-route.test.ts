import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { addUserAndAuthenticate, config, db, replSet, webServer } from '@/__tests__/shared/mongodb-server.utils'
import { makeBearer } from '../../helpers/route.helper'

describe('AddCompany Route > POST /company', () => {
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
    await replSet().stop()
  })

  it('shold return ok', async () => {
    const { accessToken } = await addUserAndAuthenticate()
    await request(webServer().server())
      .post('/company')
      .set(HttpHeaderName.AUTHORIZATION, makeBearer(accessToken))
      .send(mockCompanyEntityDto())
      .expect(HttpStatusCode.OK)
  })
})