import { CompanyModel } from '@/data/models'
import { CompanyModelDto } from '@/data/protocols'
import { AddCompanyRepository } from '@/data/repositories'
import { mockCompanyModel } from '@/__tests__/data/__mocks__/models'

export class AddCompanyRepositorySpy implements AddCompanyRepository {
  companyDto?:  CompanyModelDto
  companyModel?: CompanyModel
  shouldThrow = false

  addCompany = async (companyDto: CompanyModelDto): Promise<CompanyModel> => {
    this.companyDto = companyDto

    if (this.shouldThrow) throw new Error()

    this.companyModel = mockCompanyModel(companyDto)
    return this.companyModel
  }
}