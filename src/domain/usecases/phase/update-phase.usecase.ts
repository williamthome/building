import { Phase, UpdatePhaseDto } from '@/domain/entities'

export interface UpdatePhaseUseCase {
  call: (id: Phase['id'], dto: UpdatePhaseDto) => Promise<Phase | null>
}