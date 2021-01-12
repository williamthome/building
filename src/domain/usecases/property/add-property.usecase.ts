import { Property, Company, CreatePropertyDto } from '@/domain/entities'

export interface AddPropertyUseCase {
  call: (dto: CreatePropertyDto, companyId: Company['id']) => Promise<Property>
}
