export interface Database {
  dbUrl: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}