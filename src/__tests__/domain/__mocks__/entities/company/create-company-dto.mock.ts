import fakeData from '@/__tests__/shared/fake-data'
import { CreateCompanyDto, Plan, User } from '@/domain/entities'
import { mockPlan } from '../plan'

export const mockCreateCompanyDto = (opts?: {
  planId?: Plan['id'],
  ownerId?: User['id']
}): CreateCompanyDto => ({
  planId: opts?.planId || mockPlan().id,
  name: fakeData.person.fullName()
})