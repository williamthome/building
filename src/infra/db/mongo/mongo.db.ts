import { Database } from '@/infra/protocols'

export class MongoDB implements Database {
  constructor (public readonly dbUrl: string) {}

  connect = async (): Promise<void> => {
    console.log('Database connected')
  }

  disconnect = async (): Promise<void> => {
    console.log('Database disconnected')
  }
}