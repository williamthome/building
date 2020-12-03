import { Inject, Injectable } from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
import { Database } from '@/infra/protocols'
import { GetEntityCountForPlanLimitRepository } from '@/data/repositories'
import { LimitedModel } from '@/data/protocols'

@Injectable('getEntityCountForPlanLimitRepository')
export class DbGetEntityCountForPlanLimitRepository implements GetEntityCountForPlanLimitRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getEntityCount = async <T extends LimitedModel> (reference: CollectionName, companyId: T['companyId']): Promise<number> => {
    return await this.db.getDocumentCountBy<T, 'companyId'>('companyId', companyId, reference)
  }
}