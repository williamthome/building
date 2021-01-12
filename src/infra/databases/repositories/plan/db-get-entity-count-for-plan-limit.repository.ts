import { Inject, Injectable } from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
import { Database } from '@/infra/protocols'
import { GetEntityCountForPlanLimitRepository } from '@/data/repositories'
import { CompanyData } from '@/data/models'

@Injectable('getEntityCountForPlanLimitRepository')
export class DbGetEntityCountForPlanLimitRepository
  implements GetEntityCountForPlanLimitRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getEntityCount = async <T extends { companyId: CompanyData['id'] }>(
    reference: CollectionName,
    companyId: CompanyData['id']
  ): Promise<number> => {
    return await this.db.getDocumentCount<T, 'companyId'>({
      collectionName: reference,
      matchKey: 'companyId',
      matchValue: companyId
    })
  }
}
