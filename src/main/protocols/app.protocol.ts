import { WebServer } from '.'
import { Database } from '@/infra/protocols'

export interface App {
  webServer: WebServer
  db: Database
  run: () => Promise<App>
  stop: () => Promise<App>
  isHealthy: () => boolean
}
