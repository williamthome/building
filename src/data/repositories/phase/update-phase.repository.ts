import { PhaseData, UpdatePhaseData } from '@/data/models'

export interface UpdatePhaseRepository {
  updatePhase: (id: PhaseData['id'], dto: UpdatePhaseData) => Promise<PhaseData | null>
}