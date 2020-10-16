import { WebServer, Route } from '.'
import { Database } from '@/infra/protocols/database.protocol'

export interface App {
  server: WebServer
  db: Database
  routes: Array<Route<unknown>>
  run: () => Promise<void>
}