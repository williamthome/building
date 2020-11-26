import fakeData from '@/__tests__/shared/fake-data'
import { UserEntity } from '@/domain/entities'
import { UserDto } from '@/domain/protocols'

export const mockUserEntity = (userDto?: Partial<UserDto>): UserEntity => {
  const id = fakeData.entity.id()
  return {
    id,
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
    ...userDto,
  }
}