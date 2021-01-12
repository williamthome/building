import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { addBuildingPath } from '@/main/routes'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateBuildingDto } from '@/__tests__/domain/__mocks__/entities'

describe(`AddBuilding Route > ${addBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: addBuildingPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  it('shold return ok', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await dbUtils.verify()
    await dbUtils.addPlan()
    await dbUtils.addCompany()
    await request(dbUtils.webServer.server())
      .post(addBuildingPath.urn)
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .send(mockCreateBuildingDto())
      .expect(HttpStatusCode.OK)
  })
})
