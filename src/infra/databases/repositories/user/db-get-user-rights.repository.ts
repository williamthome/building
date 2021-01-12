import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, UserData, UserDataRights } from '@/data/models'
import { GetUserRightsRepository } from '@/data/repositories'

@Injectable('getUserRightsRepository')
export class DbGetUserRightsRepository implements GetUserRightsRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getUserRights = async (id: UserData['id']): Promise<UserDataRights[]> => {
    const companies = await this.db.getManyByNested<CompanyData, 'members', 'userId'>({
      collectionName: 'companies',
      nestedKey: 'members',
      nestedMatchKey: 'userId',
      nestedMatchValue: id
    })

    const userRights: UserDataRights[] = []
    for (const { id: companyId, name: companyName, members: companyMembers } of companies) {
      for (const { userId, companyRole: userRole, features: userFeatures } of companyMembers) {
        if (userId === id) {
          userRights.push({
            company: {
              id: companyId,
              name: companyName,
              members: companyMembers
            },
            role: userRole,
            features: userFeatures
          })
        }
      }
    }

    return userRights
  }
}
