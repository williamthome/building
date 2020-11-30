import { ModelDto, MemberModelDto, CompanyModelMembers } from '.'
import { UserModel } from '../models'
import { UserEntityRights } from '@/domain/protocols'

export type UserModelDto = ModelDto<UserModel>

export class UserModelRights implements UserEntityRights {
  constructor (
    public readonly company: CompanyModelMembers,
    public readonly rights: MemberModelDto
  ) { }
}