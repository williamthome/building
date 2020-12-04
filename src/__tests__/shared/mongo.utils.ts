import {
  MongoMemoryReplSet,
  MongoMemoryServer
} from 'mongodb-memory-server'
import fakeData from './fake-data'
import container from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
import { Server } from '@/main/server'
import { Route, RoutePath, WebServer } from '@/main/protocols'
import { TransactionController } from '@/main/decorators'
import { Database } from '@/infra/protocols'
import { mockAuthorizationToken } from '../presentation/__mocks__'
import { BuildingModel, CompanyModel, PlanModel, UserModel } from '@/data/models'
import { Hasher } from '@/data/protocols/cryptography'
import { mockBuildingEntityDto, mockCompanyEntityDto, mockUserEntityDto, mockPlanEntityDto } from '../domain/__mocks__/entities'
import { AuthEntityDto } from '@/domain/protocols'

interface MongoUtilsOptions {
  routePath: RoutePath
}

interface Entities {
  user?: UserModel | null
  plan?: PlanModel | null
  company?: CompanyModel | null
  building?: BuildingModel | null
  [k: string]: any
}

class MongoUtils {
  private _replSet?: boolean
  private _accessToken?: UserModel['accessToken']
  private _entities: Entities = {}
  private _entityCollectionName: { [K in keyof Required<Entities>]: CollectionName } = {
    user: 'users',
    plan: 'plans',
    company: 'companies',
    building: 'buildings'
  }

  get jwtSecret (): string { return container.resolve<string>('JWT_SECRET') }
  get db (): Database { return container.resolve<Database>('db') }
  get webServer (): WebServer { return container.resolve<WebServer>('webServer') }
  get mongoInMemory (): MongoMemoryReplSet | MongoMemoryServer {
    return this._replSet
      ? container.resolve(MongoMemoryReplSet)
      : container.resolve(MongoMemoryServer)
  }

  get user (): UserModel {
    if (!this._entities.user) throw new Error('Undefined user')
    return this._entities.user
  }
  get accessToken (): string {
    if (!this._accessToken) throw new Error('Undefined access token')
    return this._accessToken
  }
  get authorizationToken (): string {
    return mockAuthorizationToken(this.accessToken)
  }
  get plan (): PlanModel {
    if (!this._entities.plan) throw new Error('Undefined unlimited plan')
    return this._entities.plan
  }
  get company (): CompanyModel {
    if (!this._entities.company) throw new Error('Undefined company')
    return this._entities.company
  }
  get building (): BuildingModel {
    if (!this._entities.building) throw new Error('Undefined building')
    return this._entities.building
  }

  run = async (opts: MongoUtilsOptions): Promise<void> => {
    await mongoUtils.config(opts)
    await mongoUtils.webServer.listen()
    await mongoUtils.db.connect()
  }

  stop = async (): Promise<void> => {
    await mongoUtils.db.disconnect()
    await mongoUtils.webServer.close()
    await mongoUtils.mongoInMemory.stop()
  }

  clearCollections = async (): Promise<void> => {
    for (const key in this._entities) {
      if (this._entities[key] !== undefined)
        await this.db.clearCollection(this._entityCollectionName[key])
    }
  }

  private config = async ({ routePath }: MongoUtilsOptions): Promise<void> => {
    const server = await new Server().config()

    container.define(Server).as(server).pinned().done()
    container.define('webServer').as(server.app.webServer).pinned().done()
    container.define('db').as(server.app.db).pinned().done()

    const routes = container.resolveArray<Route<unknown, unknown>>('routes')

    const route = routes.find(route => routePath === route.path)
    if (!route)
      throw new Error(`Route ${routePath.describe} not injected`)

    let mongoInMemory: MongoMemoryReplSet | MongoMemoryServer

    this._replSet = route.controller instanceof TransactionController
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
    container.define('DB_URL').as(uri).pinned().done()
  }

  addUser = async (authDto?: AuthEntityDto): Promise<UserModel> => {
    const userDto = mockUserEntityDto(authDto)
    const hasher = container.resolve<Hasher>('hasher')
    const hashedPassword = await hasher.hash(userDto.password as string)
    this._entities.user = await this.db.addOne<UserModel>({ ...userDto, password: hashedPassword }, 'users')
    return this._entities.user
  }

  authenticate = async (): Promise<string> => {
    this._accessToken = fakeData.entity.token(this.user.id, this.jwtSecret)
    this._entities.user = await this.db.updateOne<UserModel>(this.user.id, { accessToken: this._accessToken }, 'users')
    return this._accessToken
  }

  verify = async (): Promise<void> => {
    this._entities.user = await this.db.updateOne<UserModel>(this.user.id, { verified: true }, 'users')
  }

  addPlan = async (): Promise<PlanModel> => {
    this._entities.plan = await this.db.addOne<PlanModel>(mockPlanEntityDto(), 'plans')
    return this._entities.plan
  }

  addCompany = async (): Promise<CompanyModel> => {
    this._entities.company = await this.db.addOne<CompanyModel>(mockCompanyEntityDto(
      {
        planId: this.plan.id,
        ownerId: this.user.id
      }
    ), 'companies')
    await this.db.updateOne<UserModel>(this.user.id, { activeCompanyId: this._entities.company.id }, 'users')
    return this._entities.company
  }

  addBuilding = async (): Promise<BuildingModel> => {
    this._entities.building = await this.db.addOne<BuildingModel>(mockBuildingEntityDto(this.company.id), 'buildings')
    return this._entities.building
  }
}

export const mongoUtils = new MongoUtils()