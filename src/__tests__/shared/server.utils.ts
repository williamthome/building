import { MongoMemoryReplSet } from 'mongodb-memory-server'
import container from '@/shared/dependency-injection'
import { Server } from '@/main/server'

let replSet: MongoMemoryReplSet
let uri: string
export let server: Server

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
}

export const stop = async (): Promise<void> => {
  if (!replSet || !server)
    throw new Error('Use run method before stop')

  await server.app.stop()
  await replSet.stop()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
}