import { AuthEntityDto } from '@/domain/protocols'
import fakeData from '@/__tests__/shared/fake-data'

export const mockAuthDto = (): AuthEntityDto => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password()
})