import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockApp } from '../__test__/mock/app.mock'
import { mockUserEntityDto } from '@/presentation/__test__/mocks/user-entity-dto.mock'
import { makeRouteDescribe } from '../__test__/utils/route.utils'
import { addUserRoute } from './user.routes'

const app = mockApp()

beforeAll(async () => {
  await app.webServer.injectRoutes()
  await app.webServer.ready()
})

describe(makeRouteDescribe(addUserRoute), () => {
  it('shold return ok', async () => {
    await request(app.webServer.server())
      .post(addUserRoute.path)
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})