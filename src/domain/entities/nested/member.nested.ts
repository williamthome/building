import { DeepFlattenPaths } from '@/shared/types'
import { UserFeatures, CompanyRole } from '@/shared/constants'
import { UserEntity } from '../user.entity'

export interface MemberEntity {
  userId: UserEntity['id']
  companyRole: CompanyRole
  features: UserFeatures
}

export const memberKeys: DeepFlattenPaths<MemberEntity> = {
  userId: 'userId',
  companyRole: 'companyRole',
  features: 'features'
}