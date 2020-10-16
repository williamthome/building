export interface Database {
  connect: (url: string) => Promise<void>
  disconnect: () => Promise<void>
}