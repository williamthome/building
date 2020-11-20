import { Model } from '../protocols'
import { CompanyModel } from './company.model'
import { UserEntity } from '@/domain/entities'
import { Address } from '@/domain/entities/nested'

export class UserModel extends Model implements UserEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly accessToken?: string,
    public readonly address?: Address,
    public readonly activeCompanyId?: CompanyModel['id']
  ) {
    super(id)
  }
}