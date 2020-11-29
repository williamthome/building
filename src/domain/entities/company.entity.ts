import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { MemberEntity } from './nested'
import { PlanEntity } from './plan.entity'

export interface CompanyEntity extends Entity {
  planId: PlanEntity['id']
  name: string
  members: MemberEntity[]
}

export const companyKeys: DeepFlattenPaths<CompanyEntity> = {
  id: 'id',
  planId: 'planId',
  name: 'name',
  members: 'members'
}