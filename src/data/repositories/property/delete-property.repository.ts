import { PropertyData } from '@/data/models'

export interface DeletePropertyRepository {
  deleteProperty: (id: PropertyData['id']) => Promise<PropertyData | null>
}