import { CompanyEntity, UserEntity } from '../entities'
import { MemberEntity } from '../entities/nested'
import { UserEntityResponse } from '../protocols'

export const userWithoutPassword = (user: UserEntity): UserEntityResponse => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const userIsMember = (
  members: CompanyEntity['members'],
  userId: MemberEntity['userId']
): boolean => members.some(member => userId === member.userId)