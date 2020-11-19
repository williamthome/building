import fakeData from '@/__tests__/shared/fakeData'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModelDto = (): ModelDto<UserModel> => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})