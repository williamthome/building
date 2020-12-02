import { PhaseEntity } from '@/domain/entities'

export interface GetPhaseByIdUseCase {
  call: (id: PhaseEntity['id']) => Promise<PhaseEntity | null>
}