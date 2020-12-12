/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MongoClient,
  ClientSession,
  ObjectId,
  Collection
} from 'mongodb'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { AllOptional, CollectionName, Unpacked } from '@/shared/types'
import { collectionNames } from '@/shared/constants'
import { Database } from '@/infra/protocols'
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
    return await new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).connect()
  }

  get isConnected (): boolean {
    return this._isConnected
  }

  private get session (): ClientSession {
    if (!this._session) throw new Error('No session active')
    return this._session
  }

  private map = <T> (data: any): T => {
    const { _id, ...rest } = data
    const id = (_id as ObjectId).toHexString()
    const mapped: T = { id, ...rest }
    return mapped
  }

  private createCollections = async (): Promise<void> => {
    const collections = await this._client?.db().collections() || []
    for (const collectionName of collectionNames) {
      const collectionExists = collections.some(
        (collection) => collection.collectionName === collectionName
      )
      if (!collectionExists)
        await this._client?.db().createCollection(collectionName)
    }
  }

  connect = async (): Promise<void> => {
    console.log('Connecting to MongoDB...')
    this._client = await this.makeMongoClient(this.dbUrl)
    await this.createCollections()
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

  getCollection = async <T> (collectionName: CollectionName): Promise<Collection<T>> => {
    if (!this._client || !this.isConnected) {
      console.warn('Mongo isn\'t connected. Reconnecting...')
      await this.connect()
    }
    return (this._client as MongoClient).db().collection(collectionName)
  }

  clearCollection = async (collectionName: CollectionName): Promise<void> => {
    if (process.env.NODE_ENV === 'production')
      throw new AccessDeniedError()

    const collection = await this.getCollection(collectionName)
    await collection.deleteMany({})
  }

  addOne = async <TDto, TData> (opts: {
    collectionName: CollectionName
    dto: TDto
  }): Promise<TData> => {
    const { collectionName, dto } = opts
    const collection = await this.getCollection(collectionName)
    const result = await collection.insertOne(
      dto,
      { session: this.session }
    )
    const data = result.ops[0]
    return this.map<TData>(data)
  }

  getOne = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue } = opts
    const collection = await this.getCollection(collectionName)
    const data = await collection.findOne(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      { session: this.session }
    )
    return data ? this.map<TData>(data) : null
  }

  getMany = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }): Promise<TData[]> => {
    const { collectionName, matchKey, matchValue } = opts
    const collection = await this.getCollection(collectionName)
    const models = await collection.find(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      { session: this.session }
    ).toArray()
    return models.map(model => this.map<TData>(model))
  }

  getManyByNested = async <TData, KNested extends keyof TData, KMatch extends keyof Unpacked<TData[KNested]>> (opts: {
    collectionName: CollectionName
    nestedKey: KNested
    nestedMatchKey: KMatch
    nestedMatchValue: Unpacked<TData[KNested]>[KMatch]
  }): Promise<TData[]> => {
    const { collectionName, nestedKey, nestedMatchKey, nestedMatchValue } = opts
    const collection = await this.getCollection(collectionName)
    const models = await collection.find(
      {
        [nestedKey]: {
          $elemMatch: {
            [nestedMatchKey]: nestedMatchValue
          }
        }
      },
      { session: this.session }
    ).toArray()
    return models?.map(model => this.map<TData>(model))
  }

  getAll = async <TData> (opts: {
    collectionName: CollectionName
  }): Promise<TData[]> => {
    const { collectionName } = opts
    const collection = await this.getCollection(collectionName)
    const models = await collection.find(
      {},
      { session: this.session }
    ).toArray()
    return models.map(model => this.map<TData>(model))
  }

  getDocumentCount = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }): Promise<number> => {
    const { collectionName, matchKey, matchValue } = opts
    const collection = await this.getCollection(collectionName)
    const count = await collection.countDocuments(
      { [matchKey]: matchValue },
      { session: this.session }
    )
    return count
  }

  updateOne = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    dto: AllOptional<TData>
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue, dto } = opts
    const collection = await this.getCollection(collectionName)

    if (typeof dto === 'object' && Object.entries(dto).length === 0)
      return this.getOne<any /* TData */, 'id'>({
        collectionName,
        matchKey: 'id',
        matchValue
      })

    const result = await collection.findOneAndUpdate(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      { $set: dto },
      {
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<TData>(value) : null
  }

  deleteOne = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue } = opts
    const collection = await this.getCollection(collectionName)
    const result = await collection.findOneAndDelete(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      { session: this.session }
    )
    const { value } = result
    return value ? this.map<TData>(value) : null
  }

  deleteMany = async <TData, KMatch extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }): Promise<number> => {
    const { collectionName, matchKey, matchValue } = opts
    const collection = await this.getCollection(collectionName)
    const result = await collection.deleteMany(
      { [matchKey]: matchValue },
      { session: this.session }
    )
    return result.deletedCount || 0
  }

  pushOne = async <TData, KMatch extends keyof TData, KArray extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    payload: TData[KArray] extends Array<any> ? Unpacked<TData[KArray]> : 'Must be array'
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue, arrayKey, payload } = opts
    const collection = await this.getCollection(collectionName)
    const result = await collection.findOneAndUpdate(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      {
        $push: {
          [arrayKey]: payload
        }
      },
      {
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<TData>(value) : null
  }

  pullOne = async <TData, KMatch extends keyof TData, KArray extends keyof TData> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    arrayMatchValue: TData[KArray] extends Array<any> ? AllOptional<Unpacked<TData[KArray]>> : 'Must be array'
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue, arrayKey, arrayMatchValue } = opts
    const collection = await this.getCollection(collectionName)
    const result = await collection.findOneAndUpdate(
      matchKey === 'id'
        ? { _id: new ObjectId(matchValue as any) }
        : { [matchKey]: matchValue },
      {
        $pull: {
          [arrayKey]: arrayMatchValue
        }
      },
      {
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<TData>(value) : null
  }

  setOne = async <TData, KMatch extends keyof TData, KArray extends keyof TData, KNestedMatch extends keyof Unpacked<TData[KArray]>> (opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    arrayMatchKey: KNestedMatch
    arrayMatchValue: Unpacked<TData[KArray]>[KNestedMatch]
    dto: TData[KArray] extends Array<any> ? AllOptional<Unpacked<TData[KArray]>> : 'Must be array'
  }): Promise<TData | null> => {
    const { collectionName, matchKey, matchValue, arrayKey, arrayMatchKey, arrayMatchValue, dto } = opts
    const collection = await this.getCollection(collectionName)

    const toUpdate: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(dto)) {
      toUpdate[`${arrayKey}.$.${key}`] = value
    }

    const result = await collection.findOneAndUpdate(
      matchKey === 'id'
        ? {
          _id: new ObjectId(matchValue as any),
          [arrayKey]: {
            $elemMatch: {
              [arrayMatchKey]: arrayMatchValue
            }
          }
        }
        : {
          [matchKey]: matchValue,
          [arrayKey]: {
            $elemMatch: {
              [arrayMatchKey]: arrayMatchValue
            }
          }
        },
      { $set: toUpdate },
      {
        session: this.session,
        returnOriginal: false
      }
    )
    const { value } = result
    return value ? this.map<TData>(value) : null
  }
}