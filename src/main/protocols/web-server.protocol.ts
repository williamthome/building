export interface WebServer {
  port: number
  server: () => unknown
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => Promise<void>
}