import { DeepFlattenPaths } from '@/shared/types'
import { CompanyEntity } from '../entities'

export interface Entity {
  id: string
}

export interface LimitedEntity extends Entity {
  companyId: CompanyEntity['id']
}

export type EntityDto<T extends Entity> = Partial<Omit<T, 'id'>>

export type LimitedEntityDto<T extends LimitedEntity> = EntityDto<Omit<T, 'companyId'>>

export type EntityKeys<T extends Entity> = DeepFlattenPaths<T>

export type LimitedEntityKeys<T extends LimitedEntity> = DeepFlattenPaths<T>