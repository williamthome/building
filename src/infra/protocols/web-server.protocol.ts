export interface WebServer {
  port: number
  listen: () => Promise<void>
}