import { Model } from '../protocols'
import { ProjectEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'
import { BuildingModel } from './building.model'
import { PhaseModel } from './phase.model'

export class ProjectModel extends Model implements ProjectEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly buildingId: BuildingModel['id'],
    public readonly phaseId: PhaseModel['id'],
    public readonly title: string
  ) {
    super(id)
  }
}