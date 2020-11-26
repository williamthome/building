import fakeData from '@/__tests__/shared/fake-data'
import { BuildingEntity, CompanyEntity } from '@/domain/entities'

export const mockBuildingEntityDto = (companyId?: CompanyEntity['id']): Omit<BuildingEntity, 'id'> => ({
  companyId: companyId || fakeData.entity.id(),
  title: fakeData.random.word()
})