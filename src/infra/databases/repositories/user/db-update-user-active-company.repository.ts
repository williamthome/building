import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { UpdateUserActiveCompanyRepository } from '@/data/repositories'

@Injectable('updateUserActiveCompanyRepository')
export class DbUpdateUserActiveCompanyRepository implements UpdateUserActiveCompanyRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  updateUserActiveCompany = async (id: UserData['id'], activeCompanyId: UserData['activeCompanyId']): Promise<void> => {
    await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id,
      dto: { activeCompanyId }
    })
  }
}