import { Model } from '../protocols'
import { CustomerEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'

export class CustomerModel extends Model implements CustomerEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly name: string
  ) {
    super(id)
  }
}