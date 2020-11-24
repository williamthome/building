import { MongoClient, ClientSession, ObjectId, Collection, CollectionInsertOneOptions } from 'mongodb'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { CollectionName, Unpacked } from '@/shared/types'
import { Database } from '@/infra/protocols'
import { Model } from '@/data/protocols'
import { AccessDeniedError } from '@/presentation/errors'

@Injectable('db')
export class MongoDB implements Database {
  private _client?: MongoClient
  private _session?: ClientSession
  private _isConnected = false

  constructor (
    @Inject('DB_URL') public readonly dbUrl: string
  ) { }

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

  private get session (): ClientSession {
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

  private map = <T extends Model> (data: any): T => {
    const { _id, ...rest } = data
    const id = (_id as ObjectId).toHexString()
    const mapped: T = { id, ...rest }
    return mapped
  }

  getCollection = async <T> (collectionName: CollectionName): Promise<Collection<T>> => {
    if (!this._client || !this.isConnected) {
      console.warn('Mongo isn\'t connected. Reconnecting...')
      await this.connect()
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._client!.db().collection(collectionName)
  }

  addOne = async <T extends Model> (
    payload: Partial<T>,
    collectionName: CollectionName,
    options?: Omit<CollectionInsertOneOptions, 'session'>
  ): Promise<T> => {
    const collection = await this.getCollection(collectionName)
    const data = await collection.insertOne(
      payload,
      {
        ...options,
        session: this.session
      }
    )
    const model = data.ops[0]
    return this.map<T>(model)
  }

  updateOne = async <T extends Model> (
    id: Model['id'],
    payload: Partial<T>,
    collectionName: CollectionName,
    options?: Omit<CollectionInsertOneOptions, 'session'>
  ): Promise<T | null> => {
    const collection = await this.getCollection(collectionName)

    if (typeof payload === 'object' && Object.entries(payload).length === 0)
      return this.getOneBy<T, unknown>('id', id, collectionName)

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      {
        ...options,
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<T>(value) : null
  }

  getOneBy = async <T extends Model, V> (
    field: keyof T,
    toSearch: V,
    collectionName: CollectionName,
    options?: Omit<CollectionInsertOneOptions, 'session'>
  ): Promise<T | null> => {
    const collection = await this.getCollection(collectionName)
    const model = await collection.findOne(
      field === 'id'
        ? { _id: new ObjectId(toSearch as unknown as Model['id']) }
        : { [field]: toSearch },
      {
        ...options,
        session: this.session
      }
    )
    return model ? this.map<T>(model) : null
  }

  clearCollection = async (collectionName: CollectionName): Promise<void> => {
    if (process.env.NODE_ENV === 'production')
      throw new AccessDeniedError()

    const collection = await this.getCollection(collectionName)
    await collection.deleteMany({})
  }

  pushOne = async <T extends Model, K extends keyof T, TPayload extends Unpacked<T[K]>> (
    id: Model['id'],
    arrayKey: K,
    payload: TPayload,
    collectionName: CollectionName,
    options?: Omit<CollectionInsertOneOptions, 'session'>
  ): Promise<T | null> => {
    const collection = await this.getCollection(collectionName)
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          [arrayKey]: payload
        }
      },
      {
        ...options,
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<T>(value) : null
  }

  pullOne = async <T extends Model, K extends keyof T> (
    id: Model['id'],
    arrayKey: K,
    payload: Partial<Unpacked<T[K]>>,
    collectionName: CollectionName,
    options?: Omit<CollectionInsertOneOptions, 'session'>
  ): Promise<T | null> => {
    const collection = await this.getCollection(collectionName)
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $pull: {
          [arrayKey]: payload
        }
      },
      {
        ...options,
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<T>(value) : null
  }
}