import { CompanyEntity, UserEntity } from '../entities'
import { MemberEntity } from '../entities/nested'

export type UserDto = Partial<Omit<UserEntity, 'id' | 'verified'>>

export type AuthDto = Pick<UserEntity, 'email' | 'password'>

export interface UserEntityRights {
  company: Pick<CompanyEntity, 'id' | 'members'>
  rights: Omit<MemberEntity, 'userId'>
}

export type UserEntityResponse = Omit<UserEntity, 'password'>

export interface UserVerificationToken {
  user: UserEntityResponse
  verificationToken: string
}