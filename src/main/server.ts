import 'module-alias/register'
import { MongoDB } from '@/infra/db/mongo/mongo.db'
import { Fastify } from './web-servers/fastify/fastify.web-server'
import { App } from './protocols'
import { Application } from './app'
import { AppServer } from './protocols/app-server.protocol'

export class Server implements AppServer {
  private _app: App

  constructor () {
    // Vars
    const port = parseInt(process.env.PORT || '5050')
    const dbUrl = process.env.DB_URL || 'MONGO_URL'

    // Create 3rd party dependencies
    const webServer = new Fastify(port)
    const db = new MongoDB(dbUrl)

    // Create app and inject dependencies
    this._app = new Application(webServer, db)
  }

  get app (): App {
    return this._app
  }

  listen = async (): Promise<void> => {
    console.log('App starting')
    await this._app.run()
    console.log('App is running')
  }

  close = async (): Promise<void> => {
    console.log('App shuting down')
    await this._app.stop()
    console.log('App stopped')
  }

  isHealthy = (): boolean => this.app.isHealthy()
}