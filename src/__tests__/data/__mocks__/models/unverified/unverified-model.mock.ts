import fakeData from '@/__tests__/shared/fake-data'
import { UnverifiedModel } from '@/data/models'
import { UnverifiedModelDto } from '@/data/protocols'

export const mockUnverifiedModel = (unverifiedDto?: UnverifiedModelDto): UnverifiedModel => ({
  id: fakeData.entity.id(),
  userId: fakeData.entity.id(),
  expiresIn: new Date().getTime(),
  ...unverifiedDto,
})