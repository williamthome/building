import { Phase } from '@/domain/entities'

export interface GetPhaseByIdUseCase {
  call: (id: Phase['id']) => Promise<Phase | null>
}
