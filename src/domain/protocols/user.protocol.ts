import { EntityDto } from './entity.protocol'
import { UserEntity } from '../entities'
import { MemberEntityDto } from './member.protocol'
import { CompanyEntityMembers } from './company.protocol'

export type UserEntityDto = EntityDto<UserEntity | Omit<UserEntity, 'verified'>>

export type AuthEntityDto = Pick<UserEntity, 'email' | 'password'>

export interface UserEntityRights {
  company: CompanyEntityMembers
  rights: MemberEntityDto
}

export type UserEntityResponse = Omit<UserEntity, 'password'>

export interface UserVerificationToken {
  user: UserEntityResponse
  verificationToken: string
}