import container from '@/shared/dependency-injection'
import fakeData from './fake-data'
import { BuildingModel, CompanyModel, UserModel } from '@/data/models'
import { Database } from '@/infra/protocols'
import { WebServer } from '@/main/protocols'
import { Server } from '@/main/server'
import {
  // MongoMemoryReplSet,
  MongoMemoryServer
} from 'mongodb-memory-server'

// !! ONLY DATA LAYER !!
import { mockBuildingEntityDto, mockCompanyEntityDto, mockUserEntityDto } from '../domain/__mocks__/entities'

export const db = (): Database => container.resolve<Database>('db')
export const webServer = (): WebServer => container.resolve<WebServer>('webServer')
// export const mongoInMemory = (): MongoMemoryReplSet => container.resolve(MongoMemoryReplSet)
export const mongoInMemory = (): MongoMemoryServer => container.resolve(MongoMemoryServer)

export const config = async (): Promise<void> => {
  if (!container.has(Server)) {
    // const mongoInMemory = new MongoMemoryReplSet({
    //   mongoInMemory: {
    //     storageEngine: 'wiredTiger',
    //     count: 2,
    //     name: 'rstest',
    //     dbName: 'building-test'
    //   }
    // })
    // await mongoInMemory.waitUntilRunning()

    const mongoInMemory = new MongoMemoryServer()
    const uri = await mongoInMemory.getUri()
    const server = await new Server().config()

    // container.define(MongoMemoryReplSet).as(replSet).pinned().done()
    container.define(MongoMemoryServer).as(mongoInMemory).pinned().done()
    container.define(Server).as(server).pinned().done()
    container.define('webServer').as(server.app.webServer).pinned().done()
    container.define('db').as(server.app.db).pinned().done()
    container.define('DB_URL').as(uri).pinned().done()
  }
}

export const addUserAndAuthenticate = async (): Promise<{
  authenticatedUser: UserModel,
  accessToken: UserModel['accessToken']
}> => {
  const db = container.resolve<Database>('db')
  const user = await db.addOne<UserModel>(mockUserEntityDto(), 'users')
  const jwtSecret = container.resolve<string>('JWT_SECRET')
  const accessToken = fakeData.entity.token(user.id, jwtSecret)
  const authenticatedUser = await db.updateOne<UserModel>(user.id, { accessToken }, 'users') as UserModel
  return {
    authenticatedUser,
    accessToken
  }
}

export const addCompany = async (user: UserModel): Promise<{
  owner: UserModel,
  company: CompanyModel
}> => {
  const db = container.resolve<Database>('db')
  const company = await db.addOne<CompanyModel>(mockCompanyEntityDto(user), 'companies')
  const owner = await db.updateOne<UserModel>(user.id, { activeCompanyId: company.id }, 'users') as UserModel
  return {
    owner,
    company
  }
}

export const addBuilding = async (companyId: CompanyModel['id']): Promise<{
  building: BuildingModel
}> => {
  const db = container.resolve<Database>('db')
  const building = await db.addOne<BuildingModel>(mockBuildingEntityDto(companyId), 'buildings')
  return {
    building
  }
}