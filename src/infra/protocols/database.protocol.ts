import { Model } from '@/data/protocols/model.protocol'

export interface Database {
  dbUrl: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  isConnected: boolean
  addOne: <TModel extends Model, TOptions = unknown> (
    payload: Partial<TModel>,
    collectionName: string,
    options?: TOptions
  ) => Promise<TModel>,
  updateOne: <TModel extends Model, TOptions = unknown> (
    id: Model['id'],
    payload: Partial<TModel>,
    collectionName: string,
    options?: TOptions
  ) => Promise<TModel | null>,
  getOneBy: <TModel extends Model, TValue, TOptions = unknown> (
    field: keyof TModel,
    value: TValue,
    collectionName: string,
    options?: TOptions
  ) => Promise<TModel | null>
}