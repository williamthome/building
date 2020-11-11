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
  ) => Promise<TModel>
}