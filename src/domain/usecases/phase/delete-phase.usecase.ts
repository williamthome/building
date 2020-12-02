import { PhaseEntity } from '@/domain/entities'

export interface DeletePhaseUseCase {
  call: (id: PhaseEntity['id']) => Promise<PhaseEntity | null>
}