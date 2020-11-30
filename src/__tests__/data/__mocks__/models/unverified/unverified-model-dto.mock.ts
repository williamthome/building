import fakeData from '@/__tests__/shared/fake-data'
import { UnverifiedModelDto } from '@/data/protocols'

export const mockUnverifiedModelDto = (): UnverifiedModelDto => ({
  userId: fakeData.entity.id(),
  expiresIn: new Date().getTime()
})