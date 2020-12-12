import fakeData from '@/__tests__/shared/fake-data'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanData } from '../plan'
import { CreateCompanyData } from '@/data/models'

export const mockCreateCompanyData = (): CreateCompanyData => ({
  planId: mockPlanData().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }]
})