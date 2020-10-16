import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'

export const mockUserModelDto = (): ModelDto<UserModel> => ({
  name: 'Some Name',
  address: 'Some Address'
})