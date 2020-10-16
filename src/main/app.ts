import { App } from './protocols/app.protocol'
import { setupRoutes } from './config/routes.config'
import { WebServer } from './protocols/web-server.protocol'
import { Route } from './protocols/route.protocol'
import { Database } from '@/infra/protocols/database.protocol'

export class Application implements App {
  public readonly routes: Array<Route<unknown>>

  constructor (
    public readonly server: WebServer,
    public readonly db: Database
  ) {
    this.routes = setupRoutes()
    console.log('App created')
  }

  run = async (): Promise<void> => {
    await this.server.listen()
    await this.db.connect()
  }
}