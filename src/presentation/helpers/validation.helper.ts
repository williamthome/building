// : Shared
import { Inject } from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
// > In: presentation layer
import { forbidden } from '../factories/http.factory'
import {
  HttpRequest,
  HttpResponse,
  RequestFile
} from '../protocols'
import { PlanLimitExceededError } from '../errors'
import { bytesToMB } from './file.helper'
// < Out: only domain layer
import { Company, Plan } from '@/domain/entities'
import { GetEntityCountForPlanLimitUseCase, GetFilesByReferenceIdUseCase } from '@/domain/usecases'
import { Member } from '@/domain/entities/nested'
import { planLimitCollectionName, PlanLimits } from '@/domain/protocols'

class ValidationHelper {

  @Inject()
  private readonly getEntityCountForPlanLimitUseCase!: GetEntityCountForPlanLimitUseCase

  @Inject()
  private readonly getFilesByReferenceIdUseCase!: GetFilesByReferenceIdUseCase

  validateEntityPlanLimit = async (
    httpRequest: HttpRequest<any>,
    limited: keyof PlanLimits,
    payload?: number
  ): Promise<void | HttpResponse<Error>> => {
    const activeCompanyPlanLimits = httpRequest.activeCompanyInfo?.limit as Plan['limit']
    const limitedCollectionName = planLimitCollectionName[limited]
    if (typeof activeCompanyPlanLimits !== 'undefined' && activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyLimitValue = payload !== undefined
        ? payload
        : await this.companyEntityCount(httpRequest, limitedCollectionName)
      if (activeCompanyLimitValue >= activeCompanyPlanLimits[limited])
        return forbidden(new PlanLimitExceededError(limitedCollectionName))
    }
  }

  private companyEntityCount = async (
    httpRequest: HttpRequest<any>,
    collectionName: CollectionName | 'members'
  ): Promise<number> => {
    if (collectionName === 'members') {
      const activeCompanyMembers = httpRequest.activeCompanyInfo?.members as Member[]
      return activeCompanyMembers.length
    } else {
      const activeCompanyId = httpRequest.activeCompanyInfo?.id as Company['id']
      return await this.getEntityCountForPlanLimitUseCase.call(
        collectionName, activeCompanyId
      )
    }
  }

  validateStoragePlanLimit = async (
    httpRequest: HttpRequest<any>
  ): Promise<void | HttpResponse<Error>> => {
    const requestParamId = httpRequest.params?.id as string
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