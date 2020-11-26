import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyModel, UserModel } from '@/data/models'
import { GetUserRightsRepository } from '@/data/repositories'

// !! ONLY DATA LAYER !!
import { UserRights } from '@/domain/protocols'

@Injectable('getUserRightsRepository')
export class DbGetUserRightsRepository implements GetUserRightsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getUserRights = async (id: UserModel['id']): Promise<UserRights[]> => {
    const companies = await this.db.getManyByNested<CompanyModel, 'members', 'userId'>('members', 'userId', id, 'companies')
    const userRights: UserRights[] = []
    for (const { id: companyId, members } of companies) {
      for (const { userId, companyRole, features } of members) {
        if (userId === id) {
          userRights.push({
            company: {
              id: companyId,
              members
            },
            rights: {
              companyRole,
              features
            }
          })
        }
      }
    }
    return userRights
  }
}