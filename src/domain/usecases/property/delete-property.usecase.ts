import { Property } from '@/domain/entities'

export interface DeletePropertyUseCase {
  call: (id: Property['id']) => Promise<Property | null>
}
