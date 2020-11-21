import { AuthDto } from '@/domain/protocols'
import fakeData from '@/__tests__/shared/fake-data'

export const mockAuthDto = (): AuthDto => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password()
})