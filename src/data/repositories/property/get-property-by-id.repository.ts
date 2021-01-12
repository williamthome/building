import { PropertyData } from '@/data/models'

export interface GetPropertyByIdRepository {
  getPropertyById: (id: PropertyData['id']) => Promise<PropertyData | null>
}
