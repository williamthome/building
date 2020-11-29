import { Model } from '../protocols'
import { PlanEntity } from '@/domain/entities'
import { PlanLimit, PlanValue } from '@/domain/protocols'

export class PlanModel extends Model implements PlanEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly limit: PlanLimit,
    public readonly value: PlanValue
  ) {
    super(id)
  }
}