import { Database } from '@/infra/protocols'
import { Route } from '@/presentation/protocols'
import { WebServer } from './web-server.protocol'

export interface App {
  server: WebServer
  db: Database
  routes: Array<Route<unknown>>
  run: () => Promise<void>
}