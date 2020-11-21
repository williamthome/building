import request from 'supertest'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCompanyEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { server, db, config, run, stop, addUserAndAuthenticate } from '@/__tests__/shared/mongodb-server.utils'
import { makeBearer } from '../../helpers/route.helper'

describe('AddCompany Route > POST /company', () => {
  beforeAll(async (done) => {
    await config()
    done()
  })

  beforeEach(async (done) => {
    await run()
    await db.clearCollection('users')
    await db.clearCollection('companies')
    done()
  })

  afterEach(async (done) => {
    await stop()
    done()
  })

  it('shold return ok', async () => {
    const { accessToken } = await addUserAndAuthenticate()
    await request(server.app.webServer.server())
      .post('/company')
      .set(HttpHeaderName.AUTHORIZATION, makeBearer(accessToken))
      .send(mockCompanyEntityDto())
      .expect(HttpStatusCode.OK)
  })
})
