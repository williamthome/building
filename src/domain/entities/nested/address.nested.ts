import { Nested } from '@/domain/protocols'

export interface Address extends Nested {
  street?: string
  city?: string
  state?: string
}