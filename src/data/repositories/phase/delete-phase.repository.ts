import { PhaseData } from '@/data/models'

export interface DeletePhaseRepository {
  deletePhase: (id: PhaseData['id']) => Promise<PhaseData | null>
}