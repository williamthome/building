import fakeData from '@/__tests__/shared/fake-data'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { CompanyData, CreateCompanyData, UpdateCompanyData } from '@/data/models'
import { mockPlanData } from '../plan'

export const mockCompanyData = (companyDto?: CreateCompanyData | UpdateCompanyData): CompanyData => ({
  id: fakeData.entity.id(),
  planId: mockPlanData().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...companyDto,
})