import { UserEntity } from '@/domain/entities'

export type LoggedUserInfo =
  Partial<
    Pick<UserEntity,
      | 'id'
      | 'activeCompanyId'
    >
  >