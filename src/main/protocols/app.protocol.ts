import { Database } from '@/infra/protocols'
import { Route } from '@/presentation/protocols'

export interface App {
  db: Database
  routes: Array<Route<unknown>>
  run: () => Promise<void>
}