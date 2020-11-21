import container from '@/shared/dependency-injection'
import fakeData from './fake-data'
import { mockUserEntityDto } from '../domain/__mocks__/entities'
import { UserModel } from '@/data/models'
import { UserDto } from '@/domain/protocols'
import { Database } from '@/infra/protocols'
import { WebServer } from '@/main/protocols'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { Server } from '@/main/server'

export const db = (): Database => container.resolve<Database>('db')
export const webServer = (): WebServer => container.resolve<WebServer>('webServer')
export const replSet = (): MongoMemoryReplSet => container.resolve(MongoMemoryReplSet)

export const config = async (): Promise<void> => {
  if (!container.has(Server)) {
    const replSet = new MongoMemoryReplSet({
      replSet: {
        storageEngine: 'wiredTiger',
        count: 2,
        name: 'rstest',
        dbName: 'building-test'
      }
    })
    await replSet.waitUntilRunning()
    const uri = await replSet.getUri()
    const server = await new Server().config()

    container.define(MongoMemoryReplSet).as(replSet).pinned().done()
    container.define(Server).as(server).pinned().done()
    container.define('webServer').as(server.app.webServer).pinned().done()
    container.define('db').as(server.app.db).pinned().done()
    container.define('DB_URL').as(uri).pinned().done()
  }
}

export const addUserAndAuthenticate = async (): Promise<{
  user: UserModel, accessToken: UserModel['accessToken']
}> => {
  const accessToken = fakeData.entity.token()
  const userDto: UserDto = { ...mockUserEntityDto(), accessToken }
  const db = container.resolve<Database>('db')
  const user = await db.addOne<UserModel>(userDto, 'users')
  return { user, accessToken }
}