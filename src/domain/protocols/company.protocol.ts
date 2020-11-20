import { CompanyEntity } from '../entities'

export type CompanyDto = Partial<Omit<CompanyEntity, 'id'>>