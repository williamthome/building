import { UserEntity } from '@/domain/entities'
import { MemberEntity } from '@/domain/entities/nested'

export type LoggedUserInfo =
  Partial<
    Pick<UserEntity,
      | 'id'
      | 'verified'
      | 'activeCompanyId'
    >
  >
  & Partial<
    Pick<MemberEntity,
      | 'companyRole'
      | 'features'
    >
  >