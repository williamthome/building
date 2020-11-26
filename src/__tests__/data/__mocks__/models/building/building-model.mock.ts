import fakeData from '@/__tests__/shared/fake-data'
import { BuildingModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockBuildingModel = (buildingDto?: ModelDto<BuildingModel>): BuildingModel => ({
  id: fakeData.entity.id(),
  companyId: fakeData.entity.id(),
  title: fakeData.random.word(),
  ...buildingDto,
})