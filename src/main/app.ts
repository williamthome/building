import { App } from './protocols/app.protocol'
import { WebServer } from './protocols/web-server.protocol'
import { Database } from '@/infra/protocols/database.protocol'

export class Application<U, Req, Res> implements App<U, Req, Res> {
  constructor (
    public readonly webServer: WebServer<U, Req, Res>,
    public readonly db: Database
  ) {
    console.log('App created')
  }

  run = async (): Promise<void> => {
    console.log('Starting...')
    await this.webServer.listen()
    await this.db.connect()
    console.log('App is running')
  }

  stop = async (): Promise<void> => {
    console.log('Stoping...')
    await this.webServer.close()
    await this.db.disconnect()
    console.log('App is stopped')
  }

  isHealthy = (): boolean => this.db.isConnected && this.webServer.isListening
}