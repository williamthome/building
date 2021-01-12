import { MongoMemoryReplSet, MongoMemoryServer } from 'mongodb-memory-server'
import container from '@/shared/dependency-injection'
import { Route } from '@/main/protocols'
import { TransactionController } from '@/main/decorators'
import { ConfigResponse, DataBaseUtils } from './database.utils'

export class MongoUtils extends DataBaseUtils {
  private _replSet?: boolean

  private get mongoInMemory(): MongoMemoryReplSet | MongoMemoryServer {
    return this._replSet
      ? container.resolve(MongoMemoryReplSet)
      : container.resolve(MongoMemoryServer)
  }

  protected callThisOnConfig = async (route: Route<any, any>): Promise<ConfigResponse> => {
    let mongoInMemory: MongoMemoryReplSet | MongoMemoryServer

    this._replSet =
      route.controller instanceof TransactionController
        ? route.controller.controller.usesTransaction
        : route.controller.usesTransaction

    if (this._replSet) {
      mongoInMemory = new MongoMemoryReplSet({
        replSet: {
          storageEngine: 'wiredTiger',
          count: 2
        }
      })
      await mongoInMemory.waitUntilRunning()
      container.define(MongoMemoryReplSet).as(mongoInMemory).pinned().done()
    } else {
      mongoInMemory = new MongoMemoryServer()
      container.define(MongoMemoryServer).as(mongoInMemory).pinned().done()
    }

    const uri = await mongoInMemory.getUri()

    return {
      dbURI: uri
    }
  }

  protected callThisOnRun: undefined

  protected callThisOnStop = async (): Promise<void> => {
    await this.mongoInMemory.stop()
  }
}
