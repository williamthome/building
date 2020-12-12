import { User, CreateUserDto, UpdateUserDto } from '@/domain/entities'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { CompanyData } from './company.model'

export type UserData = User

export type CreateUserData = CreateUserDto & Pick<UserData, 'verified'>

export type UpdateUserData = UpdateUserDto
export interface UserDataRights {
  company: Pick<CompanyData, 'id' | 'members'>
  role: CompanyRole
  features: UserFeatures
}