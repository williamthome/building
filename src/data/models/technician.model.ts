import { LimitedModel, Model } from '../protocols'
import { TechnicianEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'

export class TechnicianModel extends LimitedModel implements TechnicianEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly name: string,
    public readonly technicalRegisters: string[]
  ) {
    super(id, companyId)
  }
}