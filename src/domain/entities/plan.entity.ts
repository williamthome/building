import { custom } from '../protocols/schema'
import { PlanLimit, PlanValue } from '../protocols'
import { entitySchema, ExtractDto, ExtractEntity } from '../protocols/entity.protocol'

export const planSchema = entitySchema({
  limit: custom<PlanLimit>().required(),
  value: custom<PlanValue>().required()
})

export type Plan = ExtractEntity<typeof planSchema>

export type CreatePlanDto = ExtractDto<typeof planSchema>