import { LimitedModel, Model } from '../protocols'
import { PropertyEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'
import { AddressModel } from './nested'

export class PropertyModel extends LimitedModel implements PropertyEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly address?: AddressModel
  ) {
    super(id, companyId)
  }
}