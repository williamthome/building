import { Injectable, Inject } from '@/shared/dependency-injection'
import { App, WebServer } from './protocols'
import { Database } from '@/infra/protocols'

@Injectable('app')
export class Application implements App {
  constructor(
    @Inject() public readonly webServer: WebServer,
    @Inject() public readonly db: Database
  ) {
    console.log('App created')
  }

  run = async (): Promise<App> => {
    console.log('Starting...')
    await this.webServer.listen()
    await this.db.connect()
    console.log('App is running')
    return this
  }

  stop = async (): Promise<App> => {
    console.log('Stopping...')
    await this.webServer.close()
    await this.db.disconnect()
    console.log('App is stopped')
    return this
  }

  isHealthy = (): boolean => this.db.isConnected && this.webServer.isListening
}
