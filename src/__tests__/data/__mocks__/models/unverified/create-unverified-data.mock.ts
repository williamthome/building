import fakeData from '@/__tests__/shared/fake-data'
import { CreateUnverifiedData } from '@/data/models'

export const mockCreateUnverifiedData = (): CreateUnverifiedData => ({
  userId: fakeData.entity.id(),
  expiresIn: new Date().getTime()
})
