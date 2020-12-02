import { DeepFlattenPaths } from '@/shared/types'
import { CompanyEntity } from '.'
import { Entity } from '../protocols'

export interface CustomerEntity extends Entity {
  companyId: CompanyEntity['id']
  name: string
}

export const customerKeys: DeepFlattenPaths<CustomerEntity> = {
  id: 'id',
  companyId: 'companyId',
  name: 'name'
}