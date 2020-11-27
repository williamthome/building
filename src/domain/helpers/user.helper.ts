import { UserEntity } from '../entities'
import { UserEntityResponse } from '../protocols'

export const userWithoutPassword = (user: UserEntity): UserEntityResponse => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}