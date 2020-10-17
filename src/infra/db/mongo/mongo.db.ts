import { MongoClient, ClientSession } from 'mongodb'
import { Database } from '@/infra/protocols/database.protocol'

export class MongoDB implements Database {
  private _client?: MongoClient
  private _session?: ClientSession
  private _isConnected = false

  constructor (public readonly dbUrl: string) { }

  private makeMongoClient = async (uri: string): Promise<MongoClient> => {
    return await new MongoClient(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ).connect()
  }

  connect = async (): Promise<void> => {
    console.log('Connecting to MongoDB...')
    this._client = await this.makeMongoClient(this.dbUrl)
    this._session = this._client.startSession()
    console.log('Successfully connected to MongoDB')
    this._isConnected = true
  }

  disconnect = async (): Promise<void> => {
    console.log('Disconnecting from MongoDB...')
    if (!this.isConnected || !this._client) return
    if (this._session?.inTransaction()) {
      await this.rollback()
      this._session.endSession()
    }
    await this._client.close()
    this._client = undefined
    this._session = undefined
    console.log('MongoDB sucessfully disconnected')
    this._isConnected = false
  }

  get isConnected (): boolean {
    return this._isConnected
  }

  private get session(): ClientSession {
    if (!this._session) throw new Error('No session active')
    return this._session
  }

  startTransaction = async (): Promise<void> => {
    this.session.startTransaction()
    console.log('Transaction started')
  }

  commitTransaction = async (): Promise<void> => {
    await this.session.commitTransaction()
    console.log('Transaction commited')
  }

  rollback = async (): Promise<void> => {
    await this.session.abortTransaction()
    console.log('Transaction aborted')
  }
}