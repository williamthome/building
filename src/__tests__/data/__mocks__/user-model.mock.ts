import fakeData from '@/__tests__/utils/fakeData'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModel = (userDto?: ModelDto<UserModel>): UserModel => ({
  id: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  },
  ...userDto,
})