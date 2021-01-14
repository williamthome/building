import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { InviteData } from '@/data/models'
import { GetInvitesByCompanyIdRepository } from '@/data/repositories'

@Injectable('getInvitesByCompanyIdRepository')
export class DbGetInvitesByCompanyIdRepository implements GetInvitesByCompanyIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getInvitesByCompanyId = async (id: InviteData['companyId']): Promise<InviteData[]> => {
    return await this.db.getMany<InviteData, 'companyId'>({
      collectionName: 'invites',
      matchKey: 'companyId',
      matchValue: id
    })
  }
}
