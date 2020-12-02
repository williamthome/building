import { LimitedEntity, LimitedEntityKeys } from '../protocols'

export interface TechnicianEntity extends LimitedEntity {
  name: string
  technicalRegisters: string[]
}

export const technicianKeys: LimitedEntityKeys<TechnicianEntity> = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  technicalRegisters: 'technicalRegisters'
}