import { Schema } from '@/domain/protocols/schema'
import { PlanLimits, ValidateSchemaOptions } from '@/domain/protocols'

interface ValidateOptions<T> {
  schema: Schema<T>
  options?: ValidateSchemaOptions<T>
}

export interface ValidateDecoratorOptions<TBody, TParams, TQuery> {
  planLimitFor?: keyof PlanLimits
  body?: ValidateOptions<TBody>
  params?: ValidateOptions<TParams>
  query?: ValidateOptions<TQuery>
}