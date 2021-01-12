import fakeData from '@/__tests__/shared/fake-data'
import { Authentication } from '@/domain/entities'

export const mockAuthentication = (): Authentication => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password()
})
