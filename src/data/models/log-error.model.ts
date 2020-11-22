import { Model } from '../protocols'
import { LogErrorEntity } from '@/domain/entities'

export class LogErrorModel extends Model implements LogErrorEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly stack: Error['stack'],
    public readonly date: Date
  ) {
    super(id)
  }
}