import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockApp } from '../__tests__/mocks/app.mock'
import { mockUserEntityDto } from '@/presentation/__tests__/__mocks__/user-entity-dto.mock'
import { makeRouteDescribe } from '../__tests__/utils/route.utils'
import { addUserRoute } from './user.routes'

const app = mockApp()

beforeEach(async (done) => {
  await app.webServer.injectRoutes()
  await app.webServer.ready()
  done()
})

afterEach(async (done) => {
  await app.stop()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  done()
})

describe(makeRouteDescribe(addUserRoute), () => {
  it('shold return ok', async () => {
    await request(app.webServer.server())
      .post(addUserRoute.path)
      .send(mockUserEntityDto())
      .expect(HttpStatusCode.OK)
  })
})