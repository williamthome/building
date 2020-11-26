import fakeData from '@/__tests__/shared/fake-data'
import { UnverifiedModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockUnverifiedModel = (unverifiedDto?: ModelDto<UnverifiedModel>): UnverifiedModel => {
  const id = fakeData.entity.id()
  return {
    id: fakeData.entity.id(),
    token: fakeData.entity.token(id, fakeData.entity.jwtSecret()),
    expiresIn: new Date().getTime(),
    ...unverifiedDto,
  }
}