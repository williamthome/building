import fakeData from '@/__tests__/shared/fake-data'
import { Authentication, CreateUserDto } from '@/domain/entities'

export const mockCreateUserDto = (authentication?: Authentication): CreateUserDto => ({
  email: fakeData.person.email(),
  password: fakeData.entity.password(),
  ...authentication
})