import fakeData from '@/__tests__/utils/fakeData'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModelDto = (): ModelDto<UserModel> => ({
  name: fakeData.person.fullName(),
  password: fakeData.entity.password(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})