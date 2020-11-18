import fakeData from '@/__tests__/utils/fakeData'
import { UserEntity } from '@/domain/entities'

export const mockUserEntity = (userDto?: Partial<Omit<UserEntity, 'id'>>): UserEntity => ({
  id: fakeData.entity.id(),
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  },
  ...userDto,
})