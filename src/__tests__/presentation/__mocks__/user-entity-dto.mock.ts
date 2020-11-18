import fakeData from '@/__tests__/utils/fakeData'
import { UserEntity } from '@/domain/entities'

export const mockUserEntityDto = (): Omit<UserEntity, 'id'> => ({
  name: fakeData.person.fullName(),
  password: fakeData.entity.password(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})