import { UserEntity } from '../user.entity'
import { UserFeatures } from '@/shared/constants'
import { UserRole } from '@/shared/types'

export interface Member {
  userId: UserEntity['id']
  role: UserRole
  features: UserFeatures
}