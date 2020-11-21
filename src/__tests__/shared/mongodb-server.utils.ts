import { MongoMemoryReplSet } from 'mongodb-memory-server'
import container from '@/shared/dependency-injection'
import fakeData from './fake-data'
import { Server } from '@/main/server'
import { Database } from '@/infra/protocols'
import { mockUserEntityDto } from '../domain/__mocks__/entities'
import { UserModel } from '@/data/models'
import { UserDto } from '@/domain/protocols'

let replSet: MongoMemoryReplSet
let uri: string
export let server: Server
export let db: Database

export const config = async (): Promise<void> => {
  if (!replSet) {
    replSet = new MongoMemoryReplSet({
      replSet: {
        storageEngine: 'wiredTiger',
        count: 3,
        name: 'rstest',
        dbName: 'building-test'
      }
    })
  }
  if (!server) {
    server = await new Server().config()
  }
}

export const run = async (): Promise<void> => {
  if (!replSet || !server)
    throw new Error('Use config method before run')

  await replSet.waitUntilRunning()

  if (!uri) uri = await replSet.getUri()
  container.define('DB_URL').as(uri)

  await server.run()
  db = server.app.db
}

export const stop = async (): Promise<void> => {
  if (!replSet || !server)
    throw new Error('Use run method before stop')

  await server.app.stop()
  await replSet.stop()
}

export const addUserAndAuthenticate = async (): Promise<{
  user: UserModel, accessToken: UserModel['accessToken']
}> => {
  const accessToken = fakeData.entity.token()
  const userDto: UserDto = { ...mockUserEntityDto(), accessToken }
  const user = await db.addOne<UserModel>(userDto, 'users')
  return { user, accessToken }
}