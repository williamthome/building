import { Model } from '../protocols'
import { ProjectEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'
import { BuildingModel } from './building.model'

export class ProjectModel extends Model implements ProjectEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly buildingId: BuildingModel['id'],
    public readonly title: string
  ) {
    super(id)
  }
}