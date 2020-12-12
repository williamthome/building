import { Building } from '@/domain/entities'

export interface GetBuildingByIdUseCase {
  call: (id: Building['id']) => Promise<Building | null>
}