import { ProjectStatus } from '@/shared/constants'
import { LimitedModel, Model } from '../protocols'
import { CompanyModel } from './company.model'
import { BuildingModel } from './building.model'
import { PhaseModel } from './phase.model'
import { ProjectEntity } from '@/domain/entities'

export class ProjectModel extends LimitedModel implements ProjectEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly buildingId: BuildingModel['id'],
    public readonly phaseId: PhaseModel['id'],
    public readonly title: string,
    public readonly status: ProjectStatus
  ) {
    super(id, companyId)
  }
}