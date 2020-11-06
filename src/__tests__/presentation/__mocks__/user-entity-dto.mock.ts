import fakeData from '@/__tests__/utils/fakeData'
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'

export const mockUserEntityDto = (): EntityDto<UserEntity> => ({
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})