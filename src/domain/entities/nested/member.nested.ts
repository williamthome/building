import { DeepFlattenPaths } from '@/shared/types'
import { UserFeatures, UserRole } from '@/shared/constants'
import { UserEntity } from '../user.entity'

export interface Member {
  userId: UserEntity['id']
  role: UserRole
  features: UserFeatures
}

export const memberKeys: DeepFlattenPaths<Member> = {
  userId: 'userId',
  role: 'role',
  features: 'features'
}