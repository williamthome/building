import fakeData from '@/__tests__/shared/fake-data'
import { UserEntity } from '@/domain/entities'
import { AuthDto } from '@/domain/protocols'

export const mockUserEntityDto = (authDto?: AuthDto): Omit<UserEntity, 'id'> => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  accessToken: fakeData.entity.token(),
  name: fakeData.person.fullName(),
  address: {
    street: fakeData.address.street(),
    city: fakeData.address.city(),
    state: fakeData.address.state()
  },
  activeCompanyId: fakeData.entity.id(),
  ...authDto
})