import { Phase } from '@/domain/entities'

export interface DeletePhaseUseCase {
  call: (id: Phase['id']) => Promise<Phase | null>
}
