import { Property } from '@/domain/entities'

export interface GetPropertyByIdUseCase {
  call: (id: Property['id']) => Promise<Property | null>
}
