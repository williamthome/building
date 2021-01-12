import fakeData from '@/__tests__/shared/fake-data'
import { CreateUserData } from '@/data/models'

export const mockCreateUserData = (): CreateUserData => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  verified: true
})
