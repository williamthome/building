import { WebServer } from '.'
import { Database } from '@/infra/protocols/database.protocol'

export interface App {
  server: WebServer
  db: Database
  run: () => Promise<void>
}