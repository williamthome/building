import { PropertyEntity } from '@/domain/entities'

export interface DeletePropertyUseCase {
  call: (id: PropertyEntity['id']) => Promise<PropertyEntity | null>
}