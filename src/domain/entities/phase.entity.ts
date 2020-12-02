import { LimitedEntity, LimitedEntityKeys } from '../protocols'
import { BuildingEntity } from './building.entity'

export interface PhaseEntity extends LimitedEntity {
  buildingId: BuildingEntity['id']
  title: string
}

export const phaseKeys: LimitedEntityKeys<PhaseEntity> = {
  id: 'id',
  companyId: 'companyId',
  buildingId: 'buildingId',
  title: 'title'
}