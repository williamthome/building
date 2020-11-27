import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { MemberEntity } from './nested'

export interface CompanyEntity extends Entity {
  name: string
  members: MemberEntity[]
}

export const companyKeys: DeepFlattenPaths<CompanyEntity> = {
  id: 'id',
  name: 'name',
  members: 'members'
}