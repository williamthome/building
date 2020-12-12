import fakeData from '@/__tests__/shared/fake-data'
import { CreateUserData, UpdateUserData, UserData } from '@/data/models'

export const mockUserData = (dto?: CreateUserData | UpdateUserData): UserData => {
  const id = fakeData.entity.id()
  return {
    id: fakeData.entity.id(),
    email: fakeData.person.email(),
    password: fakeData.entity.password(),
    verified: false,
    accessToken: fakeData.entity.token(id, fakeData.entity.jwtSecret()),
    name: fakeData.person.fullName(),
    address: {
      street: fakeData.address.street(),
      city: fakeData.address.city(),
      state: fakeData.address.state()
    },
    activeCompanyId: fakeData.entity.id(),
    ...dto,
  }
}