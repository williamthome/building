import fakeData from '@/__tests__/shared/fake-data'
import { BuildingModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockBuildingModelDto = (): ModelDto<BuildingModel> => ({
  title: fakeData.random.word()
})