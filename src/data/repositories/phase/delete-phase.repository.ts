import { PhaseModel } from '@/data/models'

export interface DeletePhaseRepository {
  deletePhase: (projectId: PhaseModel['id']) => Promise<PhaseModel | null>
}