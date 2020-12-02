import { PhaseModelDto } from '@/data/protocols'
import { PhaseModel } from '@/data/models'

export interface UpdatePhaseRepository {
  updatePhase: (
    projectId: PhaseModel['id'],
    projectDto: PhaseModelDto
  ) => Promise<PhaseModel | null>
}