import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity } from '@/domain/entities'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanEntity } from '../plan'

export const mockCompanyEntity = (companyDto?: Partial<Omit<CompanyEntity, 'id'>>): CompanyEntity => ({
  id: fakeData.entity.id(),
  planId: mockPlanEntity().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...companyDto
})