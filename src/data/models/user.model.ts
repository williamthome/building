import { CompanyRole, UserFeatures } from '@/shared/constants'
import { OmitKey } from '@/shared/types'
import { CompanyData } from './company.model'
import { User, CreateUserDto, UpdateUserDto } from '@/domain/entities'

export type UserData = User

export type CreateUserData = OmitKey<CreateUserDto, 'passwordConfirmation'> &
  Pick<UserData, 'verified'>

export type UpdateUserData = UpdateUserDto
export interface UserDataRights {
  company: Pick<CompanyData, 'id' | 'name' | 'members'>
  role: CompanyRole
  features: UserFeatures
}
