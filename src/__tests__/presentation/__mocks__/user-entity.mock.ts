import fakeData from '~/libs/fakeData'
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'

export const mockUserEntity = (userDto?: EntityDto<UserEntity>): UserEntity => ({
  id: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  address: fakeData.address.full(),
  ...userDto,
})