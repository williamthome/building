import { PhaseModel } from '@/data/models'

export interface GetPhaseByIdRepository {
  getPhaseById: (id: PhaseModel['id']) => Promise<PhaseModel | null>
}