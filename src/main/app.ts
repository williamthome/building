import { App } from './protocols/app.protocol'
import { Database } from '@/infra/protocols'
import { Route } from '@/presentation/protocols'
import { setupRoutes } from './config/routes.config'

export class Application implements App {
  public readonly routes: Array<Route<unknown>>

  constructor (public readonly db: Database) {
    this.routes = setupRoutes()
  }

  run = async (): Promise<void> => {
    await this.db.connect()
  }
}