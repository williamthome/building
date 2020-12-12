import { CompanyData, CreateCompanyData } from '@/data/models'
import { AddCompanyRepository } from '@/data/repositories'
import { mockCompanyData } from '@/__tests__/data/__mocks__/models'

export class AddCompanyRepositorySpy implements AddCompanyRepository {
  dto?: CreateCompanyData
  company?: CompanyData
  shouldThrow = false

  addCompany = async (dto: CreateCompanyData): Promise<CompanyData> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.company = mockCompanyData(dto)
    return this.company
  }
}