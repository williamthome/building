import container from '@/shared/dependency-injection'
import fakeData from '../fake-data'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { CollectionName } from '@/shared/types'
import { Server } from '@/main/server'
import { Route, RoutePath, WebServer } from '@/main/protocols'
import { Database } from '@/infra/protocols'
import { BuildingData, CompanyData, CreateBuildingData, CreateCompanyData, CreatePlanData, CreateUserData, PlanData, UserData } from '@/data/models'
import { Hasher } from '@/data/protocols/cryptography'
import { mockCreateBuildingData, mockCreateCompanyData, mockCreateUserData, mockCreatePlanData } from '../../data/__mocks__/models'

export interface DataBaseUtilsOptions {
  routePath: RoutePath
}

export interface ConfigResponse {
  dbURI: string
}

interface Entities {
  user?: UserData | null
  plan?: PlanData | null
  company?: CompanyData | null
  building?: BuildingData | null
  [k: string]: any
}

export abstract class DataBaseUtils {

  protected abstract callThisOnConfig: (route: Route<any, any>) => Promise<ConfigResponse>
  protected abstract callThisOnRun?: () => Promise<void>
  protected abstract callThisOnStop?: () => Promise<void>

  private _accessToken?: UserData['accessToken']
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

  get user (): UserData {
    if (!this._entities.user) throw new Error('Undefined user')
    return this._entities.user
  }
  get accessToken (): string {
    if (!this._accessToken) throw new Error('Undefined access token')
    return this._accessToken
  }
  get authorizationToken (): string {
    return `Bearer ${this.accessToken}`
  }
  get plan (): PlanData {
    if (!this._entities.plan) throw new Error('Undefined unlimited plan')
    return this._entities.plan
  }
  get company (): CompanyData {
    if (!this._entities.company) throw new Error('Undefined company')
    return this._entities.company
  }
  get building (): BuildingData {
    if (!this._entities.building) throw new Error('Undefined building')
    return this._entities.building
  }

  run = async (opts: DataBaseUtilsOptions): Promise<void> => {
    await this.config(opts)
    await this.webServer.listen()
    await this.db.connect()
    if (this.callThisOnRun) await this.callThisOnRun()
  }

  stop = async (): Promise<void> => {
    await this.db.disconnect()
    await this.webServer.close()
    if (this.callThisOnStop) await this.callThisOnStop()
  }

  clearCollections = async (): Promise<void> => {
    for (const key in this._entities) {
      if (this._entities[key] !== undefined)
        await this.db.clearCollection(this._entityCollectionName[key])
    }
  }

  private config = async ({ routePath }: DataBaseUtilsOptions): Promise<void> => {
    const server = await new Server().config()

    container.define(Server).as(server).pinned().done()
    container.define('webServer').as(server.app.webServer).pinned().done()
    container.define('db').as(server.app.db).pinned().done()

    const routes = container.resolveArray<Route<unknown, unknown>>('routes')

    const route = routes.find(route => routePath === route.path)
    if (!route)
      throw new Error(`Route ${routePath.describe} not injected`)

    const { dbURI } = await this.callThisOnConfig(route)

    container.define('DB_URL').as(dbURI).pinned().done()
  }

  addUser = async (override?: {
    email: CreateUserData['email'],
    password: CreateUserData['password']
  }): Promise<UserData> => {
    const userData = override
      ? { ...mockCreateUserData(), email: override?.email, password: override?.password }
      : mockCreateUserData()
    const hasher = container.resolve<Hasher>('hasher')
    const hashedPassword = await hasher.hash(userData.password as string)
    this._entities.user = await this.db.addOne<CreateUserData, UserData>({
      collectionName: 'users',
      dto: { ...userData, password: hashedPassword }
    })
    return this._entities.user
  }

  authenticate = async (): Promise<string> => {
    this._accessToken = fakeData.entity.token(this.user.id, this.jwtSecret)
    this._entities.user = await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: this.user.id,
      dto: { accessToken: this._accessToken }
    })
    return this._accessToken
  }

  verify = async (): Promise<void> => {
    this._entities.user = await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: this.user.id,
      dto: { verified: true }
    })
  }

  addPlan = async (): Promise<PlanData> => {
    this._entities.plan = await this.db.addOne<CreatePlanData, PlanData>({
      collectionName: 'plans',
      dto: mockCreatePlanData()
    })
    return this._entities.plan
  }

  addCompany = async (): Promise<CompanyData> => {
    this._entities.company = await this.db.addOne<CreateCompanyData, CompanyData>({
      collectionName: 'companies',
      dto: {
        ...mockCreateCompanyData(),
        planId: this.plan.id,
        members: [{
          userId: this.user.id,
          companyRole: CompanyRole.owner,
          features: UserFeatures.None
        }]
      }
    })
    await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: this.user.id,
      dto: { activeCompanyId: this._entities.company.id }
    })
    return this._entities.company
  }

  addBuilding = async (): Promise<BuildingData> => {
    this._entities.building = await this.db.addOne<CreateBuildingData, BuildingData>({
      collectionName: 'buildings',
      dto: {
        ...mockCreateBuildingData(),
        companyId: this.company.id
      }
    })
    return this._entities.building
  }
}

