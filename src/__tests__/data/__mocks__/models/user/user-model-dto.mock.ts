import fakeData from '@/__tests__/shared/fake-data'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockUserModelDto = (): ModelDto<UserModel> => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  accessToken: fakeData.entity.token(),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  }
})