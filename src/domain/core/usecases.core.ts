import { Response } from '@/shared/responses'

export interface UseCase<T> {
  call: (...args: never[]) => Response<T>
}