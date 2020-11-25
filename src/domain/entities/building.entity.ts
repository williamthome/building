import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { CompanyEntity } from './company.entity'

export interface BuildingEntity extends Entity {
  companyId: CompanyEntity['id']
  title: string
}

export const buildingKeys: DeepFlattenPaths<BuildingEntity> = {
  id: 'id',
  companyId: 'companyId',
  title: 'title'
}