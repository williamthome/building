import { ProjectStatus } from '@/shared/constants'
import { DeepFlattenPaths } from '@/shared/types'
import { Entity } from '../protocols'
import { BuildingEntity } from './building.entity'
import { CompanyEntity } from './company.entity'
import { PhaseEntity } from './phase.entity'

export interface ProjectEntity extends Entity {
  companyId: CompanyEntity['id']
  buildingId: BuildingEntity['id']
  phaseId: PhaseEntity['id']
  title: string
  status: ProjectStatus
}

export const projectKeys: DeepFlattenPaths<ProjectEntity> = {
  id: 'id',
  companyId: 'companyId',
  buildingId: 'buildingId',
  phaseId: 'phaseId',
  title: 'title',
  status: 'status'
}