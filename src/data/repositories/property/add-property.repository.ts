import { CreatePropertyData, PropertyData } from '@/data/models'

export interface AddPropertyRepository {
  addProperty: (dto: CreatePropertyData) => Promise<PropertyData>
}
