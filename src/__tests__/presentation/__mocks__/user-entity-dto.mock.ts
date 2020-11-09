import fakeData from '@/__tests__/utils/fakeData'
import { UserEntity } from '@/domain/entities'

export const mockUserEntityDto = (): Partial<Omit<UserEntity, 'id'>> => ({
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})