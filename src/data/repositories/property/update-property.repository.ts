import { PropertyData, UpdatePropertyData } from '@/data/models'

export interface UpdatePropertyRepository {
  updateProperty: (id: PropertyData['id'], dto: UpdatePropertyData) => Promise<PropertyData | null>
}