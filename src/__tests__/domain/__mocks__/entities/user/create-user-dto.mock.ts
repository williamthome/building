import fakeData from '@/__tests__/shared/fake-data'
import { Authentication, CreateUserDto } from '@/domain/entities'

const password = fakeData.entity.password()

export const mockCreateUserDto = (authentication?: Authentication): CreateUserDto => ({
  email: fakeData.person.email(),
  password,
  passwordConfirmation: authentication?.password || password,
  ...authentication
})
