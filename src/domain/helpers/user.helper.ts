/* eslint-disable no-unused-vars */
import { Company, User } from '../entities'
import { Member } from '../entities/nested'
import { UserResponse } from '../protocols'

export const userWithoutPassword = (user: User): UserResponse => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const userIsMember = (members: Company['members'], userId: Member['userId']): boolean =>
  members.some((member) => userId === member.userId)
