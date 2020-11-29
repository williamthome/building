import { Model } from '@/data/protocols/model.protocol'
import { CollectionName, Unpacked } from '@/shared/types'

export interface Database {
  dbUrl: string
  isConnected: boolean

  connect: () => Promise<void>

  disconnect: () => Promise<void>

  startTransaction: () => Promise<void>

  commitTransaction: () => Promise<void>

  rollback: () => Promise<void>

  clearCollection: (collectionName: CollectionName) => Promise<void>

  addOne: <TModel extends Model, TOptions = unknown> (
    payload: Partial<TModel>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel>

  getOneBy: <TModel extends Model, TValue, TOptions = unknown> (
    field: keyof TModel,
    toSearch: TValue,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel | null>

  getManyByNested: <T extends Model, KNested extends keyof T, KMatch extends keyof Unpacked<T[KNested]>, TOptions = unknown> (
    nestedKey: KNested,
    matchKey: KMatch,
    match: Unpacked<T[KNested]>[KMatch],
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T[]>

  getAll: <TModel extends Model, TOptions = unknown> (
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel[]>

  updateOne: <TModel extends Model, TOptions = unknown> (
    id: Model['id'],
    payload: Partial<TModel>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel | null>

  deleteOne: <T extends Model, TOptions = unknown> (
    id: Model['id'],
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>

  deleteOneBy: <T extends Model, K extends keyof T, TOptions = unknown> (
    field: K,
    toSearch: T[K],
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>

  deleteMany: <T extends Model, K extends keyof T, TOptions = unknown> (
    field: K,
    match: T[K],
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<number>

  pushOne: <T extends Model, K extends keyof T, TOptions = unknown> (
    id: Model['id'],
    arrayKey: K,
    payload: Unpacked<T[K]>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>

  pullOne: <T extends Model, K extends keyof T, TOptions = unknown> (
    id: Model['id'],
    arrayKey: K,
    payload: Partial<Unpacked<T[K]>>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>

  setOne: <T extends Model, KArray extends keyof T, KMatch extends keyof Unpacked<T[KArray]>, TOptions = unknown> (
    id: Model['id'],
    arrayKey: KArray,
    matchKey: KMatch,
    match: Unpacked<T[KArray]>[KMatch],
    payload: Partial<Unpacked<T[KArray]>>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>
}