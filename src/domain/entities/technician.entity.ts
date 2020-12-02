import { DeepFlattenPaths } from '@/shared/types'
import { CompanyEntity } from '.'
import { Entity } from '../protocols'

export interface TechnicianEntity extends Entity {
  companyId: CompanyEntity['id']
  name: string
  technicalRegisters: string[]
}

export const technicianKeys: DeepFlattenPaths<TechnicianEntity> = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  technicalRegisters: 'technicalRegisters'
}