import { WebServer } from '.'
import { Database } from '@/infra/protocols/database.protocol'

export interface App<U, Req, Res> {
  webServer: WebServer<U, Req, Res>
  db: Database
  run: () => Promise<void>
  stop: () => Promise<void>
  isHealthy: () => boolean
}