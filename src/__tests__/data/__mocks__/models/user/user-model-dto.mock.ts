import fakeData from '@/__tests__/shared/fake-data'
import { UserModelDto } from '@/data/protocols'

export const mockUserModelDto = (): UserModelDto => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  accessToken: fakeData.entity.token(fakeData.entity.id(), fakeData.entity.jwtSecret()),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  },
  activeCompanyId: fakeData.entity.id()
})