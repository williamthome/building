import { Entity, PlanLimit, PlanValue } from '../protocols'

export interface PlanEntity extends Entity {
  limit: PlanLimit
  value: PlanValue
}