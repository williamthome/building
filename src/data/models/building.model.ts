import { Model } from '../protocols'
import { BuildingEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'

export class BuildingModel extends Model implements BuildingEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly title: string
  ) {
    super(id)
  }
}