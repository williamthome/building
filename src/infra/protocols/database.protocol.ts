import { AllOptional, CollectionName, Unpacked } from '@/shared/types'

export interface Database {
  dbUrl: string
  isConnected: boolean

  connect: () => Promise<void>

  disconnect: () => Promise<void>

  startTransaction: () => Promise<void>

  commitTransaction: () => Promise<void>

  rollback: () => Promise<void>

  clearCollection: (collectionName: CollectionName) => Promise<void>

  addOne: <TDto, TData>(opts: { collectionName: CollectionName; dto: TDto }) => Promise<TData>

  getOne: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }) => Promise<TData | null>

  getMany: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }) => Promise<TData[]>

  getManyByNested: <
    TData,
    KNested extends keyof TData,
    KMatch extends keyof Unpacked<TData[KNested]>
  >(opts: {
    collectionName: CollectionName
    nestedKey: KNested
    nestedMatchKey: KMatch
    nestedMatchValue: Unpacked<TData[KNested]>[KMatch]
  }) => Promise<TData[]>

  getAll: <TData>(opts: { collectionName: CollectionName }) => Promise<TData[]>

  getDocumentCount: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }) => Promise<number>

  updateOne: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    dto: AllOptional<TData>
  }) => Promise<TData | null>

  deleteOne: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }) => Promise<TData | null>

  deleteMany: <TData, KMatch extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
  }) => Promise<number>

  pushOne: <TData, KMatch extends keyof TData, KArray extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    payload: TData[KArray] extends Array<any> ? Unpacked<TData[KArray]> : 'Must be array'
  }) => Promise<TData | null>

  pullOne: <TData, KMatch extends keyof TData, KArray extends keyof TData>(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    arrayMatchValue: TData[KArray] extends Array<any>
      ? AllOptional<Unpacked<TData[KArray]>>
      : 'Must be array'
  }) => Promise<TData | null>

  setOne: <
    TData,
    KMatch extends keyof TData,
    KArray extends keyof TData,
    KNestedMatch extends keyof Unpacked<TData[KArray]>
  >(opts: {
    collectionName: CollectionName
    matchKey: KMatch
    matchValue: TData[KMatch]
    arrayKey: KArray
    arrayMatchKey: KNestedMatch
    arrayMatchValue: Unpacked<TData[KArray]>[KNestedMatch]
    dto: TData[KArray] extends Array<any> ? AllOptional<Unpacked<TData[KArray]>> : 'Must be array'
  }) => Promise<TData | null>
}
