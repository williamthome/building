import { PhaseEntity } from '@/domain/entities'

export interface DeletePhaseUseCase {
  call: (projectId: PhaseEntity['id']) => Promise<PhaseEntity | null>
}