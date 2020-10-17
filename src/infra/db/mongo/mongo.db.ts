import { Database } from '@/infra/protocols/database.protocol'

export class MongoDB implements Database {
  private _isConnected = false

  constructor (public readonly dbUrl: string) {}

  connect = async (): Promise<void> => {
    console.log('Database connected')
    this._isConnected = true
  }

  disconnect = async (): Promise<void> => {
    console.log('Database disconnected')
    this._isConnected = false
  }

  get isConnected(): boolean {
    return this._isConnected
  }
}