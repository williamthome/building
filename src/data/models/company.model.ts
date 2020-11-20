import { Model } from '../protocols'
import { CompanyEntity } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

export class CompanyModel extends Model implements CompanyEntity {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly members: Member[]
  ) {
    super(id)
  }
}