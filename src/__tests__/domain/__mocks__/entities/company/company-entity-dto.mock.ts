import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity, PlanEntity, UserEntity } from '@/domain/entities'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanEntity } from '../plan'

export const mockCompanyEntityDto = (
  { planId, ownerId }: {
    planId?: PlanEntity['id'],
    ownerId?: UserEntity['id']
  } = {}
): Omit<CompanyEntity, 'id'> => ({
  planId: planId || mockPlanEntity().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: ownerId || fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }]
})