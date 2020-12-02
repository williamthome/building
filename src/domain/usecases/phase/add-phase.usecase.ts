import { PhaseEntity, CompanyEntity } from '@/domain/entities'
import { PhaseEntityDto } from '@/domain/protocols'

export interface AddPhaseUseCase {
  call: (
    dto: PhaseEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<PhaseEntity>
}