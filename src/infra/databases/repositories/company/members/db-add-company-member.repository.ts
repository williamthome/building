import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData } from '@/data/models'
import { AddCompanyMemberRepository } from '@/data/repositories'
import { CreateMemberData } from '@/data/models/nested'

@Injectable('addCompanyMemberRepository')
export class DbAddCompanyMemberRepository implements AddCompanyMemberRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addCompanyMember = async (companyId: CompanyData['id'], dto: CreateMemberData): Promise<CompanyData | null> => {
    return await this.db.pushOne<CompanyData, 'id', 'members'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: companyId,
      arrayKey: 'members',
      payload: dto
    })
  }
}