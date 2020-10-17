import 'module-alias/register'
import { MongoDB } from './infra/db/mongo/mongo.db'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { Application } from './main/app'

export type ServerStatus = 'undefined' | 'created' | 'listening' | 'error'

export class Server {
  _status: ServerStatus = 'undefined'
  app: Application

  constructor () {
    console.log('Creating server')

    // Vars
    const port = parseInt(process.env.PORT || '5050')
    const dbUrl = process.env.DB_URL || 'MONGO_URL'

    // Create 3rd party dependencies
    const webServer = new Fastify(port)
    const db = new MongoDB(dbUrl)

    // Create app and inject dependencies
    this.app = new Application(webServer, db)

    // Set status
    this._status = 'created'

    console.log('Server created')
  }

  get status(): ServerStatus {
    return this._status
  }

  listen = async (): Promise<void> => {
    try {
      console.log('App starting')
      await this.app.run()
      this._status = 'listening'
      console.log('App is running')
    } catch (error) {
      console.log('Shuting down')
      this.app.stop()
      this._status = 'error'
      console.error(error)
    }
  }
}