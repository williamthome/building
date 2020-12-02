import { PhaseModel } from '@/data/models'

export interface DeletePhaseRepository {
  deletePhase: (id: PhaseModel['id']) => Promise<PhaseModel | null>
}