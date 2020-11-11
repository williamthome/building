import { DeepFlattenPaths } from '@/shared/types'

export interface Address {
  street?: string
  city?: string
  state?: string
}

export const addressKeys: DeepFlattenPaths<Address> = {
  street: 'street',
  city: 'city',
  state: 'state'
}