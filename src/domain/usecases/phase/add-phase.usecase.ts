import { PhaseEntity, CompanyEntity } from '@/domain/entities'
import { PhaseEntityDto } from '@/domain/protocols'

export interface AddPhaseUseCase {
  call: (
    projectDto: PhaseEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<PhaseEntity>
}