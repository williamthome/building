import fakeData from '~/libs/fakeData'
import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModelDto = (): ModelDto<UserModel> => ({
  name: fakeData.person.fullName(),
  address: fakeData.address.full()
})