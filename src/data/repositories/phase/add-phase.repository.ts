import { CreatePhaseData, PhaseData } from '@/data/models'

export interface AddPhaseRepository {
  addPhase: (dto: CreatePhaseData) => Promise<PhaseData>
}
