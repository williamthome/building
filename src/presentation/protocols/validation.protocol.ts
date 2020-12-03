import { PlanLimits } from '@/domain/protocols'
import { CollectionName, DeepFlattenPaths } from '@/shared/types'
import { HttpParameters, HttpQuery } from './http.protocol'
import { Schema } from './schema.protocol'

export interface ValidationResult {
  valid: boolean
  errorMessage?: string
  validations?: Validation[]
}

export interface Validation {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ) => ValidationResult
}

export interface ValidateSchemaOptions<T extends Record<PropertyKey, any>> {
  schema: Schema<T>
  keys: DeepFlattenPaths<T>
  nullable?: boolean
  banned?: Array<keyof T>
}

export interface LimitedEntityOptions {
  reference: keyof PlanLimits,
  collectionName: CollectionName | 'members'
}

export interface ValidateOptions
  <
  TBody extends Record<PropertyKey, any>,
  TParams extends HttpParameters = HttpParameters,
  TQuery extends HttpQuery = HttpQuery
  > {
  body?: ValidateSchemaOptions<TBody>
  params?: ValidateSchemaOptions<TParams>
  query?: ValidateSchemaOptions<TQuery>,
  limited?: LimitedEntityOptions
}

export abstract class BaseValidation<T extends Validation> implements Validation {
  isParam = false
  customErrorMessage: string | undefined = undefined
  abstract readonly validation: () => T

  param = (): T => {
    this.isParam = true
    return this.validation()
  }

  message = (message: string | undefined): T => {
    this.customErrorMessage = message
    return this.validation()
  }

  abstract validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ) => ValidationResult
}