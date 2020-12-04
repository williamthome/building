// : Shared
import { Inject } from '@/shared/dependency-injection'
import { CollectionName, DeepFlattenPaths } from '@/shared/types'
// > In: presentation layer
import { badRequest, forbidden, noContent } from '../factories/http.factory'
import {
  HttpParameters,
  HttpQuery,
  HttpRequest,
  HttpResponse,
  RequestFile,
  Schema,
  SchemaOptions,
  ValidateBodySchemaOptions,
  ValidateOptions,
  ValidateSchemaOptions,
  Validation,
  ValidationResult
} from '../protocols'
import { isNestedSchema } from './schema.helper'
import { required } from '../validations'
import { BannedFieldError, MissingBodyError, PlanLimitExceededError } from '../errors'
import { bytesToMB } from './file.helper'
// < Out: only domain layer
import { CompanyEntity, PlanEntity } from '@/domain/entities'
import { GetEntityCountForPlanLimitUseCase, GetFilesByReferenceIdUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'
import { Entity, planLimitCollectionName, PlanLimits } from '@/domain/protocols'

class ValidationHelper {

  @Inject()
  private readonly getEntityCountForPlanLimitUseCase!: GetEntityCountForPlanLimitUseCase

  @Inject()
  private readonly getFilesByReferenceIdUseCase!: GetFilesByReferenceIdUseCase

  validateHttpRequest = async <TRequest> (
    {
      body: bodySchema,
      params: paramsSchema,
      query: querySchema,
      planLimitFor: limited
    }: ValidateOptions<TRequest>,
    httpRequest: HttpRequest<TRequest>
  ): Promise<void | HttpResponse<null | Error>> => {
    const { body, params, query } = httpRequest

    if (limited) {
      const limitedError = limited === 'storageMb'
        ? await this.validateStoragePlanLimit(httpRequest)
        : await this.validateEntityPlanLimit(httpRequest, limited)
      if (limitedError) return limitedError
    }

    if (paramsSchema) {
      const paramsError = this.validateParams(params, paramsSchema)
      if (paramsError) return paramsError
    }

    if (querySchema) {
      const queryError = this.validateQuery(query, querySchema)
      if (queryError) return queryError
    }

    if (bodySchema) {
      const bodyError = this.validateBody(body, bodySchema)
      if (bodyError) return bodyError
    }
  }

  schemaError = <TObj extends Record<PropertyKey, any>, TSchema extends Record<PropertyKey, any> = TObj> (
    obj: TObj,
    schema: Schema<TSchema>,
    keys: DeepFlattenPaths<TSchema>,
    partialValidation?: boolean,
    bannedFields?: Array<keyof TSchema>
  ): HttpResponse<Error> | undefined => {
    if (keys) this.deleteInexistentFields(obj, keys)

    if (bannedFields) {
      for (const field of bannedFields) {
        if (field in obj)
          return badRequest(new BannedFieldError(field))
      }
    }

    for (const [field, value] of Object.entries(schema)) {
      if (partialValidation && !(field in obj)) continue

      const fieldSchema = isNestedSchema(value) ? value : value as SchemaOptions

      const error = this.validationsError(obj, field, fieldSchema.validations)
      if (error)
        return error

      if (isNestedSchema(fieldSchema)) {
        const nestedObj = obj[field]
        if (!nestedObj && !this.requiredInValidations(fieldSchema.validations))
          continue

        const nestedError = this.schemaError(nestedObj, fieldSchema.nested as any, keys, partialValidation, bannedFields)
        if (nestedError)
          return nestedError
      }
    }
    return undefined
  }

  private deleteInexistentFields = <T extends Record<PropertyKey, any>> (
    obj: Partial<T>,
    keys: DeepFlattenPaths<T>
  ): void => {
    const objectKeys = Object.keys(obj) as string[]
    const schemaKeys = Object.values(keys) as string[]
    objectKeys.forEach(k => {
      if (!schemaKeys.includes(k))
        delete obj[k]
    })
  }

  private validationsError = <T extends Record<PropertyKey, any>> (
    obj: T,
    field: keyof T,
    validations: Validation[]
  ): HttpResponse<Error> | undefined => {
    for (const validation of validations) {
      const { valid, errorMessage } = validation.validate(obj, field, validations)
      if (!valid)
        return badRequest(new Error(errorMessage))
    }
    return undefined
  }

  requiredInValidations = (
    validations?: Validation[]
  ): boolean => validations ? validations.some(v => v === required) : false

  validIfNotRequired = <T> (
    valid: boolean,
    obj: T,
    field: keyof T,
    validations?: Validation[]
  ): boolean => !valid && !this.requiredInValidations(validations) && !(field in obj) ? true : valid

  errorIfInvalid = (
    valid: boolean,
    messageMessage: string,
    customMessage: string | undefined
  ): string | undefined => valid ? undefined : customMessage || messageMessage

  makeValidationResult = <T> (
    valid: boolean,
    obj: T,
    field: keyof T,
    errorMessage: string,
    customErrorMessage: string | undefined,
    validations?: Validation[]
  ): ValidationResult => ({
    valid: this.validIfNotRequired(valid, obj, field, validations),
    errorMessage: this.errorIfInvalid(valid, errorMessage, customErrorMessage),
    validations
  })

  validateParams = <TRequest> (
    params: HttpParameters | undefined,
    { schema, keys }: ValidateSchemaOptions<TRequest>
  ): void | HttpResponse<null | Error> => {
    const error = this.schemaError(params || {}, schema, keys)
    if (error) return error
  }

  validateQuery = <TRequest> (
    query: HttpQuery | undefined,
    { schema, keys }: ValidateSchemaOptions<TRequest>
  ): void | HttpResponse<null | Error> => {
    const error = this.schemaError(query || {}, schema, keys)
    if (error) return error
  }

  validateBody = <TRequest> (
    body: TRequest | undefined,
    { schema, keys, partialValidation, bannedFields }: ValidateBodySchemaOptions<TRequest>
  ): void | HttpResponse<null | Error> => {
    if (!body && !partialValidation)
      return badRequest(new MissingBodyError())

    if (!body) return noContent()

    const error = this.schemaError<TRequest>(body, schema, keys, partialValidation, bannedFields)
    if (error) return error
  }

  validateEntityPlanLimit = async <TRequest> (
    httpRequest: HttpRequest<TRequest>,
    limited: keyof PlanLimits,
    payload?: number
  ): Promise<void | HttpResponse<Error>> => {
    const activeCompanyPlanLimits = httpRequest.activeCompanyInfo?.limit as PlanEntity['limit']
    const limitedCollectionName = planLimitCollectionName[limited]
    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyLimitValue = payload !== undefined
        ? payload
        : await this.companyEntityCount(httpRequest, limitedCollectionName)
      if (activeCompanyLimitValue >= activeCompanyPlanLimits[limited])
        return forbidden(new PlanLimitExceededError(limitedCollectionName))
    }
  }

  private companyEntityCount = async <TRequest> (
    httpRequest: HttpRequest<TRequest>,
    collectionName: CollectionName | 'members'
  ): Promise<number> => {
    if (collectionName === 'members') {
      const activeCompanyMembers = httpRequest.activeCompanyInfo?.members as MemberEntity[]
      return activeCompanyMembers.length
    } else {
      const activeCompanyId = httpRequest.activeCompanyInfo?.id as CompanyEntity['id']
      return await this.getEntityCountForPlanLimitUseCase.call(
        collectionName, activeCompanyId
      )
    }
  }

  validateStoragePlanLimit = async <TRequest> (
    httpRequest: HttpRequest<TRequest>
  ): Promise<void | HttpResponse<Error>> => {
    const requestParamId = httpRequest.params?.id as Entity['id']
    const requestFiles = httpRequest.files as RequestFile[]

    const files = await this.getFilesByReferenceIdUseCase.call(requestParamId)
    if (files.length === 0) return

    const totalRequestFilesSizeInBytes = requestFiles.reduce(
      (total, { buffer }) => total + buffer.byteLength, 0
    )
    const totalRequestFilesSizeInMegabytes = bytesToMB(totalRequestFilesSizeInBytes)
    const totalProjectFilesSizeInBytes = files.reduce(
      (total, { sizeInBytes }) => total + sizeInBytes, 0
    )
    const totalProjectFilesSizeInMegabytes = bytesToMB(totalProjectFilesSizeInBytes)
    const totalFilesSizeInMegabytes = totalRequestFilesSizeInMegabytes + totalProjectFilesSizeInMegabytes

    const storageValidationError = await this.validateEntityPlanLimit(
      httpRequest,
      'storageMb',
      totalFilesSizeInMegabytes
    )
    if (storageValidationError)
      return storageValidationError
  }
}

export const validationHelper = new ValidationHelper()