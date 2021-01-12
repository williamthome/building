import { User } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

export type LoggedUserInfo = Partial<Pick<User, 'id' | 'verified' | 'activeCompanyId'>> &
  Partial<Pick<Member, 'companyRole' | 'features'>>
