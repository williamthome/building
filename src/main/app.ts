import { App } from './protocols/app.protocol'
import { WebServer } from './protocols/web-server.protocol'
import { Database } from '@/infra/protocols/database.protocol'

export class Application implements App {
  constructor (
    public readonly webServer: WebServer,
    public readonly db: Database
  ) { }

  run = async (): Promise<void> => {
    await this.webServer.listen()
    await this.db.connect()
  }
}