import { custom, string } from '../protocols/schema'
import { PlanLimit, PlanValue } from '../protocols'
import { entitySchema, ExtractDto, ExtractEntity } from '../protocols/entity.protocol'

export const planSchema = entitySchema({
  name: string().required(),
  limit: custom<PlanLimit>().required(),
  value: custom<PlanValue>().required()
})

export type Plan = ExtractEntity<typeof planSchema>

export type CreatePlanDto = ExtractDto<typeof planSchema>
