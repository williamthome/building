import { LimitedEntity, LimitedEntityKeys } from '../protocols'
import { BuildingEntity } from './building.entity'
import { PhaseEntity } from './phase.entity'
import { ProjectStatus } from '@/shared/constants'

export interface ProjectEntity extends LimitedEntity {
  buildingId: BuildingEntity['id']
  phaseId: PhaseEntity['id']
  title: string
  status: ProjectStatus
}

export const projectKeys: LimitedEntityKeys<ProjectEntity> = {
  id: 'id',
  companyId: 'companyId',
  buildingId: 'buildingId',
  phaseId: 'phaseId',
  title: 'title',
  status: 'status'
}