import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { updateBuildingPath } from '@/main/routes'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { mockCreateBuildingDto } from '@/__tests__/domain/__mocks__/entities'

describe(`UpdateBuilding Route > ${updateBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: updateBuildingPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  const makeURN = (): string => updateBuildingPath.fillURN().params({ id: dbUtils.building.id }).urn

  it('shold return ok', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await dbUtils.verify()
    await dbUtils.addPlan()
    await dbUtils.addCompany()
    await dbUtils.addBuilding()
    await request(dbUtils.webServer.server())
      .patch(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .send(mockCreateBuildingDto())
      .expect(HttpStatusCode.OK)
  })
})
