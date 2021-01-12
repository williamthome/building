import { Phase, Company, CreatePhaseDto } from '@/domain/entities'

export interface AddPhaseUseCase {
  call: (dto: CreatePhaseDto, companyId: Company['id']) => Promise<Phase>
}
