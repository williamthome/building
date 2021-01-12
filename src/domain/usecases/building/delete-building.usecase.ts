import { Building } from '@/domain/entities'

export interface DeleteBuildingUseCase {
  call: (id: Building['id']) => Promise<Building | null>
}
