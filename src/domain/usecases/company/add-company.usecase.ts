import { Company, CreateCompanyDto, User } from '@/domain/entities'

export interface AddCompanyUseCase {
  call: (dto: CreateCompanyDto, loggedUserId: User['id']) => Promise<Company>
}