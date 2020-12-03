// : Shared
import container from '@/shared/dependency-injection'
import { CollectionName, DeepFlattenPaths } from '@/shared/types'
// > In: presentation layer
import { badRequest, forbidden, noContent } from '../factories/http.factory'
import {
  HttpParameters,
  HttpQuery,
  HttpRequest,
  HttpResponse,
  LimitedEntityOptions,
  RequestFile,
  Schema,
  SchemaOptions,
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
import { GetEntityCountForPlanLimitUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'
import { FileResponse } from '@/domain/protocols'

export const schemaError = <TObj extends Record<PropertyKey, any>, TSchema extends Record<PropertyKey, any> = TObj> (
  obj: TObj,
  schema: Schema<TSchema>,
  nullable: boolean,
  keys?: DeepFlattenPaths<TSchema>,
  banned?: Array<keyof TSchema>
): HttpResponse<Error> | undefined => {
  if (keys) deleteInexistentFields(obj, keys)

  for (const [field, value] of Object.entries(schema)) {
    if (banned?.some(bannedField => field === bannedField))
      return badRequest(new BannedFieldError(field))

    if (nullable && !(field in obj)) continue

    const fieldSchema = isNestedSchema(value) ? value : value as SchemaOptions

    const error = validationsError(obj, field, fieldSchema.validations)
    if (error)
      return error

    if (isNestedSchema(fieldSchema)) {
      const nestedObj = obj[field]
      if (!nestedObj && !requiredInValidations(fieldSchema.validations))
        continue

      const nestedError = schemaError(nestedObj, fieldSchema.nested, nullable, keys as any)
      if (nestedError)
        return nestedError
    }
  }
  return undefined
}

const deleteInexistentFields = <T extends Record<PropertyKey, any>> (
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

const validationsError = <T extends Record<PropertyKey, any>> (
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

export const requiredInValidations = (
  validations?: Validation[]
): boolean => validations ? validations.some(v => v === required) : false

export const validIfNotRequired = <T> (
  valid: boolean,
  obj: T,
  field: keyof T,
  validations?: Validation[]
): boolean => !valid && !requiredInValidations(validations) && !(field in obj) ? true : valid

export const errorIfInvalid = (
  valid: boolean,
  messageMessage: string,
  customMessage: string | undefined
): string | undefined => valid ? undefined : customMessage || messageMessage

export const makeValidationResult = <T> (
  valid: boolean,
  obj: T,
  field: keyof T,
  errorMessage: string,
  customErrorMessage: string | undefined,
  validations?: Validation[]
): ValidationResult => (
    {
      valid: validIfNotRequired(valid, obj, field, validations),
      errorMessage: errorIfInvalid(valid, errorMessage, customErrorMessage),
      validations
    }
  )

export const validateParams = <TRequest> (
  params: HttpParameters | undefined,
  { schema, keys, nullable = false, banned }: ValidateSchemaOptions<TRequest>
): void | HttpResponse<null | Error> => {
  const error = schemaError(params || {}, schema, nullable, keys, banned)
  if (error) return error
}

export const validateQuery = <TRequest> (
  query: HttpQuery | undefined,
  { schema, keys, nullable = false, banned }: ValidateSchemaOptions<TRequest>
): void | HttpResponse<null | Error> => {
  const error = schemaError(query || {}, schema, nullable, keys, banned)
  if (error) return error
}

export const validateBody = <TRequest> (
  body: TRequest | undefined,
  { schema, keys, nullable = false }: ValidateSchemaOptions<TRequest>
): void | HttpResponse<null | Error> => {
  if (!body && !nullable)
    return badRequest(new MissingBodyError())

  if (!body) return noContent()

  const error = schemaError<TRequest>(body, schema, nullable, keys)
  if (error) return error
}

export const validatePlanLimit = async <TRequest> (
  httpRequest: HttpRequest<TRequest>,
  { reference, collectionName }: LimitedEntityOptions,
  payload?: number
): Promise<void | HttpResponse<Error>> => {
  const activeCompanyPlanLimits = httpRequest.activeCompanyInfo?.limit as PlanEntity['limit']
  if (activeCompanyPlanLimits !== 'unlimited') {
    const activeCompanyLimitValue = payload !== undefined
      ? payload
      : await companyEntityCount(httpRequest, collectionName)
    if (activeCompanyLimitValue >= activeCompanyPlanLimits[reference])
      return forbidden(new PlanLimitExceededError(collectionName))
  }
}

const companyEntityCount = async <TRequest> (
  httpRequest: HttpRequest<TRequest>,
  collectionName: CollectionName | 'members'
): Promise<number> => {
  if (collectionName === 'members') {
    const activeCompanyMembers = httpRequest.activeCompanyInfo?.members as MemberEntity[]
    return activeCompanyMembers.length
  } else {
    const getEntityCountForPlanLimitUseCase =
      container.resolve<GetEntityCountForPlanLimitUseCase>(
        'getEntityCountForPlanLimitUseCase'
      )
    const activeCompanyId = httpRequest.activeCompanyInfo?.id as CompanyEntity['id']
    return await getEntityCountForPlanLimitUseCase.call(
      collectionName, activeCompanyId
    )
  }
}

export const validateStoragePlanLimit = async <TRequest> (
  httpRequest: HttpRequest<TRequest>,
  payload: FileResponse[] | number,
): Promise<void | HttpResponse<Error>> => {
  const requestFiles = httpRequest.files as RequestFile[]

  const totalRequestFilesSizeInBytes = requestFiles.reduce(
    (total, { buffer }) => total + buffer.byteLength, 0
  )
  const totalRequestFilesSizeInMegabytes = bytesToMB(totalRequestFilesSizeInBytes)
  const totalProjectFilesSizeInBytes = typeof payload === 'number'
    ? payload
    : payload.reduce(
      (total, { sizeInBytes }) => total + sizeInBytes, 0
    )
  const totalProjectFilesSizeInMegabytes = bytesToMB(totalProjectFilesSizeInBytes)
  const totalFilesSizeInMegabytes = totalRequestFilesSizeInMegabytes + totalProjectFilesSizeInMegabytes

  const storageValidationError = await validatePlanLimit(
    httpRequest,
    {
      reference: 'storageMb',
      collectionName: 'files'
    },
    totalFilesSizeInMegabytes
  )
  if (storageValidationError)
    return storageValidationError
}