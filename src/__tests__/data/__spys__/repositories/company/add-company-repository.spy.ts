import { CompanyModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { AddCompanyRepository } from '@/data/repositories'
import { mockCompanyModel } from '@/__tests__/data/__mocks__/models'

export class AddCompanyRepositorySpy implements AddCompanyRepository {
  companyDto?:  ModelDto<CompanyModel>
  companyModel?: CompanyModel
  shouldThrow = false

  addCompany = async (companyDto: ModelDto<CompanyModel>): Promise<CompanyModel> => {
    this.companyDto = companyDto

    if (this.shouldThrow) throw new Error()

    this.companyModel = mockCompanyModel(companyDto)
    return this.companyModel
  }
}