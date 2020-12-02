import { PropertyEntity } from '@/domain/entities'
import { PropertyEntityDto } from '@/domain/protocols'

export interface UpdatePropertyUseCase {
  call: (id: PropertyEntity['id'], dto: PropertyEntityDto) => Promise<PropertyEntity | null>
}