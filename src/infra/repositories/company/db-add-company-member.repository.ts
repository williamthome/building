import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { AddCompanyMemberRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

// !! MOVE TO DATA LAYER !!
import { Member } from '@/domain/entities/nested'

@Injectable('addCompanyMemberRepository')
export class DbAddCompanyMemberRepository implements AddCompanyMemberRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addCompanyMember = async (companyId: CompanyModel['id'], member: Member): Promise<CompanyModel | null> => {
    return await this.db.pushOne<CompanyModel, 'members', Member>(companyId, 'members', member, 'companies')
  }
}