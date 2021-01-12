import fakeData from '@/__tests__/shared/fake-data'
import { Building, CreateBuildingDto, UpdateBuildingDto } from '@/domain/entities'

export const mockBuilding = (dto?: CreateBuildingDto | UpdateBuildingDto): Building => ({
  id: fakeData.entity.id(),
  companyId: fakeData.entity.id(),
  title: fakeData.random.word(),
  ...dto
})
