import { Company, CreateCompanyDto, UpdateCompanyDto } from '@/domain/entities'

export type CompanyData = Company

export type CreateCompanyData = CreateCompanyDto & Pick<CompanyData, 'members'>

export type UpdateCompanyData = UpdateCompanyDto
