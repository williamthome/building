import fakeData from '@/__tests__/shared/fake-data'
import { CreateBuildingData } from '@/data/models'

export const mockCreateBuildingData = (): CreateBuildingData => ({
  companyId: fakeData.entity.id(),
  title: fakeData.random.word()
})