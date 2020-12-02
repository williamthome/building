import { PhaseModelDto } from '@/data/protocols'
import { PhaseModel } from '@/data/models'

export interface AddPhaseRepository {
  addPhase: (dto: PhaseModelDto) => Promise<PhaseModel>
}