import { PhaseEntity } from '@/domain/entities'
import { PhaseEntityDto } from '@/domain/protocols'

export interface UpdatePhaseUseCase {
  call: (id: PhaseEntity['id'], dto: PhaseEntityDto) => Promise<PhaseEntity | null>
}