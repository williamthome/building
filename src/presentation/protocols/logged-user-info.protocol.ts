import { UserEntity } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

export type LoggedUserInfo =
  Partial<
    Pick<UserEntity,
      | 'id'
    >
  >
  & Partial<
    Pick<Member,
      | 'role'
      | 'features'
    >
  >