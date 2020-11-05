import { Database } from '@/infra/protocols'
import { WebServer } from '@/presentation/protocols'

export interface App {
  webServer: WebServer
  db: Database
  run: () => Promise<App>
  stop: () => Promise<App>
  isHealthy: () => boolean
}