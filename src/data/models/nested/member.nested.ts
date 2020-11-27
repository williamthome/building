import { UserFeatures, CompanyRole } from '@/shared/constants'
import { MemberEntity } from '@/domain/entities/nested'
import { UserModel } from '../user.model'

export class MemberModel implements MemberEntity {
  constructor (
    public readonly userId: UserModel['id'],
    public readonly companyRole: CompanyRole,
    public readonly features: UserFeatures
  ) { }
}