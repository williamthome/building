import fakeData from '@/__tests__/shared/fake-data'
import { BuildingData, CreateBuildingData, UpdateBuildingData } from '@/data/models'

export const mockBuildingData = (dto?: CreateBuildingData | UpdateBuildingData): BuildingData => ({
  id: fakeData.entity.id(),
  companyId: fakeData.entity.id(),
  title: fakeData.random.word(),
  ...dto,
})