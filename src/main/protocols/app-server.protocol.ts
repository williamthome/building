import { App } from './app.protocol'

export type ServerStatus = 'undefined' | 'created' | 'listening' | 'closed' | 'error'

export interface AppServer {
  status: ServerStatus
  app: App
  listen: () => Promise<void>
  close: () => Promise<void>
}