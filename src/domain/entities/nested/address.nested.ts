import { DeepFlattenPaths } from '@/shared/types'

export interface AddressEntity {
  street?: string
  city?: string
  state?: string
}

export const addressKeys: DeepFlattenPaths<AddressEntity> = {
  street: 'street',
  city: 'city',
  state: 'state'
}