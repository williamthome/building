import request from 'supertest'
import { mongoUtils } from '@/__tests__/shared/mongo.utils'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'

xdescribe('UpdateUserActiveCompany Route > PATCH /user/activeCompany/:companyId', () => {
  beforeAll(async () => {
    await mongoUtils.config()
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  })

  beforeEach(async () => {
    await mongoUtils.db.clearCollection('companies')
    await mongoUtils.db.clearCollection('users')
  })

  afterAll(async () => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
  })

  it('shold return no content', async () => {
    await mongoUtils.addUser()
    await mongoUtils.authenticate()
    await mongoUtils.verify()
    await mongoUtils.addCompany()
    await request(mongoUtils.webServer.server())
      .patch(`/user/activeCompany/${mongoUtils.company.id}`)
      .set(HttpHeaderName.AUTHORIZATION, mongoUtils.authorizationToken)
      .expect(HttpStatusCode.NO_CONTENT)
  })
})