import { PropertyModelDto } from '@/data/protocols'
import { PropertyModel } from '@/data/models'

export interface UpdatePropertyRepository {
  updateProperty: (id: PropertyModel['id'], dto: PropertyModelDto) => Promise<PropertyModel | null>
}