import { Entity, LimitedEntity } from '@/domain/protocols/entity.protocol'
import { CompanyModel } from '../models'

export abstract class Model implements Entity {
  constructor (public readonly id: Entity['id']) { }
}

export abstract class LimitedModel extends Model implements LimitedEntity {
  constructor (
    public readonly id: Entity['id'],
    public readonly companyId: CompanyModel['id']
  ) {
    super(id)
  }
}

export type ModelDto<T extends Model> = Partial<Omit<T, 'id'>>

export type LimitedModelDto<T extends LimitedModel> = ModelDto<Omit<T, 'companyId'>>