import { Entity, EntityKeys } from '../protocols'
import { MemberEntity } from './nested'
import { PlanEntity } from './plan.entity'

export interface CompanyEntity extends Entity {
  planId: PlanEntity['id']
  name: string
  members: MemberEntity[]
}

export const companyKeys: EntityKeys<CompanyEntity> = {
  id: 'id',
  planId: 'planId',
  name: 'name',
  members: 'members'
}