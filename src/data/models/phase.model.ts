import { LimitedModel, Model } from '../protocols'
import { PhaseEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'
import { BuildingModel } from './building.model'

export class PhaseModel extends LimitedModel implements PhaseEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly buildingId: BuildingModel['id'],
    public readonly title: string
  ) {
    super(id, companyId)
  }
}