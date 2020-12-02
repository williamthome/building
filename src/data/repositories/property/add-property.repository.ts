import { PropertyModelDto } from '@/data/protocols'
import { PropertyModel } from '@/data/models'

export interface AddPropertyRepository {
  addProperty: (dto: PropertyModelDto) => Promise<PropertyModel>
}