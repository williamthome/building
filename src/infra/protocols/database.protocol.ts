import { Model } from '@/data/protocols/model.protocol'
import { CollectionName, Unpacked } from '@/shared/types'

export interface Database {
  dbUrl: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  isConnected: boolean
  addOne: <TModel extends Model, TOptions = unknown> (
    payload: Partial<TModel>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel>,
  updateOne: <TModel extends Model, TOptions = unknown> (
    id: Model['id'],
    payload: Partial<TModel>,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel | null>,
  getOneBy: <TModel extends Model, TValue, TOptions = unknown> (
    field: keyof TModel,
    toSearch: TValue,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<TModel | null>,
  clearCollection: (collectionName: CollectionName) => Promise<void>
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
}