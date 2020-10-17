import 'module-alias/register'
import { MongoDB } from '@/infra/db/mongo/mongo.db'
import { Fastify } from './web-servers/fastify/fastify.web-server'
import { App } from './protocols'
import { Application } from './app'
import { AppServer, ServerStatus } from './protocols/app-server.protocol'

export class Server implements AppServer {
  private _status: ServerStatus = 'undefined'
  private _app: App

  constructor () {
    console.log('Creating server')

    // Vars
    const port = parseInt(process.env.PORT || '5050')
    const dbUrl = process.env.DB_URL || 'MONGO_URL'

    // Create 3rd party dependencies
    const webServer = new Fastify(port)
    const db = new MongoDB(dbUrl)

    // Create app and inject dependencies
    this._app = new Application(webServer, db)

    // Set status
    this._status = 'created'

    console.log('Server created')
  }

  get status (): ServerStatus {
    return this._status
  }

  get app (): App {
    return this._app
  }

  listen = async (): Promise<void> => {
    console.log('App starting')
    await this._app.run()
    this._status = 'listening'
    console.log('App is running')
  }

  close = async (): Promise<void> => {
    console.log('App shuting down')
    await this._app.stop()
    this._status = 'closed'
    console.log('App stopped')
  }
}