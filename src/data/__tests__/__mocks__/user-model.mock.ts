import fakeData from '~/libs/fakeData'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModel = (userDto?: ModelDto<UserModel>): UserModel => ({
  id: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  address: fakeData.address.full(),
  ...userDto,
})