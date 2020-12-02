import { PropertyModel } from '@/data/models'

export interface GetPropertyByIdRepository {
  getPropertyById: (id: PropertyModel['id']) => Promise<PropertyModel | null>
}