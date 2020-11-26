import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { BuildingEntity } from './building.entity'
import { CompanyEntity } from './company.entity'

export interface ProjectEntity extends Entity {
  companyId: CompanyEntity['id']
  buildingId: BuildingEntity['id']
  title: string
}

export const projectKeys: DeepFlattenPaths<ProjectEntity> = {
  id: 'id',
  companyId: 'companyId',
  buildingId: 'buildingId',
  title: 'title'
}