import { App } from './protocols/app.protocol'
import { WebServer, Database } from '@/infra/protocols'
import { Route } from '@/presentation/protocols'
import { setupRoutes } from './config/routes.config'

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