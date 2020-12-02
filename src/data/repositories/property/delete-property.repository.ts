import { PropertyModel } from '@/data/models'

export interface DeletePropertyRepository {
  deleteProperty: (id: PropertyModel['id']) => Promise<PropertyModel | null>
}