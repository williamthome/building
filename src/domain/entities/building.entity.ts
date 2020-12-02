import { LimitedEntity, LimitedEntityKeys } from '../protocols'

export interface BuildingEntity extends LimitedEntity {
  title: string
}

export const buildingKeys: LimitedEntityKeys<BuildingEntity> = {
  id: 'id',
  companyId: 'companyId',
  title: 'title'
}