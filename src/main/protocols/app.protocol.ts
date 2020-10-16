import { WebServer, Database } from '@/infra/protocols'
import { Route } from '@/presentation/protocols'

export interface App {
  server: WebServer
  db: Database
  routes: Array<Route<unknown>>
  run: () => Promise<void>
}