import fakeData from '@/__tests__/shared/fake-data'
import { BuildingEntity } from '@/domain/entities'

export const mockBuildingEntity = (buildingDto?: Partial<Omit<BuildingEntity, 'id'>>): BuildingEntity => ({
  id: fakeData.entity.id(),
  companyId: fakeData.entity.id(),
  title: fakeData.random.word(),
  ...buildingDto
})