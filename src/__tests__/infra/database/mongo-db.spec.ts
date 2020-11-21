import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoDB } from '@/infra/databases'
import container from '@/shared/dependency-injection'
import { ObjectId } from 'mongodb'

//#region Factories

let mongodb: MongoDB
let mongoMemoryServer: MongoMemoryServer

//#endregion Factories

describe('MongoDB Database', () => {
  beforeEach(async (done) => {
    mongoMemoryServer = new MongoMemoryServer()
    const dbUrl = await mongoMemoryServer.getUri()

    container.clear()
    container.bind('DB_URL').as(dbUrl)
    container.bind(MongoDB).asNewable(MongoDB)

    mongodb = container.resolve(MongoDB)
    await mongodb.connect()

    done()
  })

  afterEach(async (done) => {
    if (mongodb.isConnected)
      await mongodb.disconnect()
    await mongoMemoryServer.stop()
    done()
  })

  describe('connect()', () => {
    it('should be connected', async () => {
      expect(mongodb.isConnected).toBeTruthy()
    })
  })

  describe('disconnect()', () => {
    it('should be disconnected', async () => {
      await mongodb.disconnect()
      expect(mongodb.isConnected).toBeFalsy()
    })

    it('should not throw if disconnect twice', async () => {
      await mongodb.disconnect()
      await expect(mongodb.disconnect()).resolves.not.toThrow()
    })
  })

  describe('getCollection()', () => {
    it('should return an collection', async () => {
      await expect(mongodb.getCollection('users')).resolves.toBeTruthy()
    })

    it('should reconnect if connection is lost', async () => {
      await mongodb.disconnect()
      await mongodb.getCollection('users')
      expect(mongodb.isConnected).toBeTruthy()
    })
  })

  describe('addOne()', () => {
    it('should add', async () => {
      const collection = await mongodb.getCollection('users')
      let nDocs = await collection.countDocuments()
      expect(nDocs).toBe(0)
      await mongodb.addOne({}, 'users')
      nDocs = await collection.countDocuments()
      expect(nDocs).toBe(1)
    })
  })

  describe('getOneBy()', () => {
    it('should return truthy', async () => {
      const { id } = await mongodb.addOne({}, 'users')
      await expect(mongodb.getOneBy('id', id, 'users')).resolves.toBeTruthy()
    })

    it('should return falsy', async () => {
      await expect(mongodb.getOneBy('id', undefined, 'users')).resolves.toBeFalsy()
    })
  })

  describe('updateOne()', () => {
    it('should return falsy', async () => {
      await expect(mongodb.updateOne(new ObjectId().toHexString(), {}, 'users')).resolves.toBeFalsy()
    })

    it('should update', async () => {
      const { id } = await mongodb.addOne<any>({}, 'users')
      await mongodb.updateOne<any>(id, { field: 'updated' }, 'users')
      const updated = await mongodb.getOneBy<any, any>('id', id, 'users')
      expect(updated.field).toBe('updated')
    })
  })
})