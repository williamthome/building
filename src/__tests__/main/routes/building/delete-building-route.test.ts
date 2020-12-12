import request from 'supertest'
import { dbUtils } from '@/__tests__/shared/database'
import { deleteBuildingPath } from '@/main/routes'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'

describe(`DeleteBuilding Route > ${deleteBuildingPath.describe}`, () => {
  beforeAll(async () => {
    await dbUtils.run({ routePath: deleteBuildingPath })
  })

  beforeEach(async () => {
    await dbUtils.clearCollections()
  })

  afterAll(async () => {
    await dbUtils.stop()
  })

  const makeURN = (): string => deleteBuildingPath
    .fillURN()
    .params({ id: dbUtils.building.id })
    .urn

  it('shold return ok', async () => {
    await dbUtils.addUser()
    await dbUtils.authenticate()
    await dbUtils.verify()
    await dbUtils.addPlan()
    await dbUtils.addCompany()
    await dbUtils.addBuilding()
    await request(dbUtils.webServer.server())
      .delete(makeURN())
      .set(HttpHeaderName.AUTHORIZATION, dbUtils.authorizationToken)
      .expect(HttpStatusCode.OK)
  })
})