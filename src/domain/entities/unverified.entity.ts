import { DeepFlattenPaths } from '@/shared/types/flatten'
import { Entity } from '../protocols/entity.protocol'

export interface UnverifiedEntity extends Entity {
  token: string
  expiresIn: number
}

export const unverifiedKeys: DeepFlattenPaths<UnverifiedEntity> = {
  id: 'id',
  token: 'token',
  expiresIn: 'expiresIn'
}