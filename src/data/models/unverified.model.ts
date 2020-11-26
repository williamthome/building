import { Model } from '../protocols'
import { UnverifiedEntity } from '@/domain/entities'

export class UnverifiedModel extends Model implements UnverifiedEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly token: string,
    public readonly expiresIn: number
  ) {
    super(id)
  }
}