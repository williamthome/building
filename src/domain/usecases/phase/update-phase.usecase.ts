import { PhaseEntity } from '@/domain/entities'
import { PhaseEntityDto } from '@/domain/protocols'

export interface UpdatePhaseUseCase {
  call: (projectId: PhaseEntity['id'], projectDto: PhaseEntityDto) => Promise<PhaseEntity | null>
}