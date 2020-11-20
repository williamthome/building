import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { Member } from './nested'

export interface CompanyEntity extends Entity {
  name: string
  members: Member[]
}

export const companyKeys: DeepFlattenPaths<CompanyEntity> = {
  id: 'id',
  name: 'name',
  members: 'members'
}