import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models'
import { UpdateUserActiveCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('updateUserActiveCompanyRepository')
export class DbUpdateUserActiveCompanyRepository implements UpdateUserActiveCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateUserActiveCompany = async (
    id: UserModel['id'],
    activeCompanyId: UserModel['activeCompanyId']
  ): Promise<void> => {
    await this.db.updateOne<UserModel>(id, { activeCompanyId }, 'users')
  }
}