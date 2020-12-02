import { PropertyEntity } from '@/domain/entities'

export interface GetPropertyByIdUseCase {
  call: (id: PropertyEntity['id']) => Promise<PropertyEntity | null>
}