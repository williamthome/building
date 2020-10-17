import { WebServer } from '.'
import { Database } from '@/infra/protocols/database.protocol'

export interface App {
  webServer: WebServer
  db: Database
  run: () => Promise<void>
  stop: () => Promise<void>
}