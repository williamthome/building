import { Model } from '../protocols'
import { CompanyEntity } from '@/domain/entities'
import { MemberEntity } from '@/domain/entities/nested'

export class CompanyModel extends Model implements CompanyEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly name: string,
    public readonly members: MemberEntity[]
  ) {
    super(id)
  }
}