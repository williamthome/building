import { CompanyEntity, UserEntity } from '../entities'
import { Member } from '../entities/nested'

export type UserDto = Partial<Omit<UserEntity, 'id' | 'verified'>>

export type AuthDto = Pick<UserEntity, 'email' | 'password'>

export interface UserRights {
  company: Pick<CompanyEntity, 'id' | 'members'>
  rights: Omit<Member, 'userId'>
}

export type UserEntityResponse = Omit<UserEntity, 'password'>

export interface UserVerificationToken {
  user: UserEntityResponse
  verificationToken: string
}