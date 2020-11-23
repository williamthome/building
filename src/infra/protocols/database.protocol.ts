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
  pushOne: <T extends Model, K extends keyof T, TPayload extends Unpacked<T[K]>, TOptions = unknown> (
    id: Model['id'],
    arrayKey: K,
    payload: TPayload,
    collectionName: CollectionName,
    options?: TOptions
  ) => Promise<T | null>
}