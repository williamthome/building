import fakeData from '@/__tests__/shared/fake-data'
import { BuildingModelDto } from '@/data/protocols'

export const mockBuildingModelDto = (): BuildingModelDto => ({
  title: fakeData.random.word()
})