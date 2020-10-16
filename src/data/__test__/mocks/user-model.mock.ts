import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModel = (userDto?: ModelDto<UserModel>): UserModel => ({
  id: 'Some Id',
  name: 'Some Name',
  address: 'Some Address',
  ...userDto,
})