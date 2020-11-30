import { CompanyModel } from './company.model'
import { Model } from '../protocols'
import { UserEntity } from '@/domain/entities'
import { AddressEntity } from '@/domain/entities/nested'

export class UserModel extends Model implements UserEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly email: string,
    public readonly password: string,
    public readonly verified: boolean,
    public readonly name: string,
    public readonly accessToken?: string,
    public readonly address?: AddressEntity,
    public readonly activeCompanyId?: CompanyModel['id']
  ) {
    super(id)
  }
}