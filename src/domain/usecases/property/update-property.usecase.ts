import { Property, UpdatePropertyDto } from '@/domain/entities'

export interface UpdatePropertyUseCase {
  call: (id: Property['id'], dto: UpdatePropertyDto) => Promise<Property | null>
}