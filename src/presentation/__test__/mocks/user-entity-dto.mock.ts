import fakeData from '~/lib/fakeData'
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'

export const mockUserEntityDto = (): EntityDto<UserEntity> => ({
  name: fakeData.person.fullName(),
  address: fakeData.address.full()
})