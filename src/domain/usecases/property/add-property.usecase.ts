import { PropertyEntity, CompanyEntity } from '@/domain/entities'
import { PropertyEntityDto } from '@/domain/protocols'

export interface AddPropertyUseCase {
  call: (
    dto: PropertyEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<PropertyEntity>
}