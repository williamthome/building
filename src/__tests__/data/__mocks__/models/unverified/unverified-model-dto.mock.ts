import fakeData from '@/__tests__/shared/fake-data'
import { UnverifiedModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockUnverifiedModelDto = (): ModelDto<UnverifiedModel> => ({
  token: fakeData.entity.token(fakeData.entity.id(), fakeData.entity.jwtSecret()),
  expiresIn: new Date().getTime()
})