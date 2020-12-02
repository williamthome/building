import { PhaseModelDto } from '@/data/protocols'
import { PhaseModel } from '@/data/models'

export interface UpdatePhaseRepository {
  updatePhase: (
    id: PhaseModel['id'],
    dto: PhaseModelDto
  ) => Promise<PhaseModel | null>
}