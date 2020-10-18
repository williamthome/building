import { Inject, Injectable } from '@/shared/dependency-injection/injector/decorators'
import { App } from './protocols/app.protocol'
import { WebServer } from './protocols/web-server.protocol'
import { Database } from '@/infra/protocols/database.protocol'

@Injectable
export class Application implements App {
  constructor (
    @Inject public readonly webServer: WebServer,
    @Inject public readonly db: Database
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