import fakeData from '@/__tests__/shared/fake-data'
import { CreateUnverifiedData, UnverifiedData } from '@/data/models'

export const mockUnverifiedData = (dto?: CreateUnverifiedData): UnverifiedData => ({
  id: fakeData.entity.id(),
  userId: fakeData.entity.id(),
  expiresIn: new Date().getTime(),
  ...dto
})
