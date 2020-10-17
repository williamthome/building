import { App } from './app.protocol'

export interface AppServer {
  app: App
  listen: () => Promise<void>
  close: () => Promise<void>
  isHealthy: () => boolean
}