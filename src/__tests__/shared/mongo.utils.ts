import {
  MongoMemoryReplSet,
  MongoMemoryServer
} from 'mongodb-memory-server'
import fakeData from './fake-data'
import container from '@/shared/dependency-injection'
import { Server } from '@/main/server'
import { WebServer } from '@/main/protocols'
import { Database } from '@/infra/protocols'
import { BuildingModel, CompanyModel, UserModel } from '@/data/models'
import { mockAuthorizationToken } from '../presentation/__mocks__'
import { mockBuildingEntityDto, mockCompanyEntityDto, mockUserEntityDto } from '../domain/__mocks__/entities'
import { AuthDto } from '@/domain/protocols'
import { Hasher } from '@/data/protocols/cryptography'

class MongoUtils {
  private _replSet?: boolean
  private _user?: UserModel | null
  private _accessToken?: UserModel['accessToken']
  private _company?: CompanyModel | null
  private _building?: BuildingModel | null

  get jwtSecret (): string { return container.resolve<string>('JWT_SECRET') }
  get db (): Database { return container.resolve<Database>('db') }
  get webServer (): WebServer { return container.resolve<WebServer>('webServer') }
  get mongoInMemory (): MongoMemoryReplSet | MongoMemoryServer {
    return this._replSet
      ? container.resolve(MongoMemoryReplSet)
      : container.resolve(MongoMemoryServer)
  }

  get user (): UserModel {
    if (!this._user) throw new Error('Undefined user')
    return this._user
  }
  get accessToken (): string {
    if (!this._accessToken) throw new Error('Undefined access token')
    return this._accessToken
  }
  get authorizationToken (): string {
    return mockAuthorizationToken(this.accessToken)
  }
  get company (): CompanyModel {
    if (!this._company) throw new Error('Undefined company')
    return this._company
  }
  get building (): BuildingModel {
    if (!this._building) throw new Error('Undefined building')
    return this._building
  }

  config = async (replSet = false): Promise<MongoUtils> => {
    this._replSet = replSet

    let mongoInMemory: MongoMemoryReplSet | MongoMemoryServer

    if (replSet) {
      mongoInMemory = new MongoMemoryReplSet({
        replSet: {
          storageEngine: 'wiredTiger',
          count: 2,
          name: 'rstest',
          dbName: 'building-test'
        }
      })
      await mongoInMemory.waitUntilRunning()
      container.define(MongoMemoryReplSet).as(mongoInMemory).pinned().done()
    } else {
      mongoInMemory = new MongoMemoryServer()
      container.define(MongoMemoryServer).as(mongoInMemory).pinned().done()
    }

    const uri = await mongoInMemory.getUri()
    const server = await new Server().config()

    container.define(Server).as(server).pinned().done()
    container.define('webServer').as(server.app.webServer).pinned().done()
    container.define('db').as(server.app.db).pinned().done()
    container.define('DB_URL').as(uri).pinned().done()

    return this
  }

  addUser = async (authDto?: AuthDto): Promise<UserModel> => {
    const userDto = mockUserEntityDto(authDto)
    const hasher = container.resolve<Hasher>('hasher')
    const hashedPassword = await hasher.hash(userDto.password as string)
    this._user = await this.db.addOne<UserModel>({ ...userDto, password: hashedPassword }, 'users')
    return this._user
  }

  authenticate = async (): Promise<string> => {
    this._accessToken = fakeData.entity.token(this.user.id, this.jwtSecret)
    this._user = await this.db.updateOne<UserModel>(this.user.id, { accessToken: this._accessToken }, 'users')
    return this._accessToken
  }

  verify = async (): Promise<void> => {
    this._user = await this.db.updateOne<UserModel>(this.user.id, { verified: true }, 'users')
  }

  addCompany = async (): Promise<CompanyModel> => {
    this._company = await this.db.addOne<CompanyModel>(mockCompanyEntityDto(this.user), 'companies')
    await this.db.updateOne<UserModel>(this.user.id, { activeCompanyId: this._company.id }, 'users')
    return this._company
  }

  addBuilding = async (): Promise<BuildingModel> => {
    this._building = await this.db.addOne<BuildingModel>(mockBuildingEntityDto(this.company.id), 'buildings')
    return this._building
  }
}

export const mongoUtils = new MongoUtils()