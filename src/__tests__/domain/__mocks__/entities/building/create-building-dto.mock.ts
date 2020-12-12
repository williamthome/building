import fakeData from '@/__tests__/shared/fake-data'
import { CreateBuildingDto } from '@/domain/entities'

export const mockCreateBuildingDto = (): CreateBuildingDto => ({
  title: fakeData.random.word()
})