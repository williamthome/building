import { PhaseData } from '@/data/models'

export interface GetPhaseByIdRepository {
  getPhaseById: (id: PhaseData['id']) => Promise<PhaseData | null>
}