import { Schema } from '@/domain/protocols/schema'
import { PlanLimits, ValidateSchemaOptions } from '@/domain/protocols'

interface ValidateOptions<T extends Record<string, unknown> | undefined> {
  schema: Schema<T>
  options?: ValidateSchemaOptions<T>
}

export interface ValidateDecoratorOptions<
  TBody extends Record<string, unknown> | undefined,
  TParams extends Record<string, unknown> | undefined,
  TQuery extends Record<string, unknown> | undefined
> {
  planLimitFor?: keyof PlanLimits
  body?: ValidateOptions<TBody>
  params?: ValidateOptions<TParams>
  query?: ValidateOptions<TQuery>
}
