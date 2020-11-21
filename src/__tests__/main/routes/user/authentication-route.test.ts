import request from 'supertest'
import { HttpStatusCode } from '@/presentation/constants'
import { mockAuthDto, mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { config, db, replSet, webServer } from '@/__tests__/shared/mongodb-server.utils'

describe('Authentication Route > POST /login', () => {
  beforeAll(async () => {
    await config()
    await db().connect()
  })

  beforeEach(async () => {
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
    const authDto = mockAuthDto()

    // add user
    await request(webServer().server())
      .post('/user')
      .send(mockUserEntityDto(authDto))

    // login
    await request(webServer().server())
      .post('/login')
      .send(authDto)
      .expect(HttpStatusCode.OK)
  })
})