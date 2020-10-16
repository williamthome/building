import { Controller } from '@/presentation/protocols'

export interface HttpAdapter<T> {
  adapt: (controller: Controller<T>) => Promise<void>
}