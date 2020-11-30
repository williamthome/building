import fakeData from '@/__tests__/shared/fake-data'
import { CompanyModel } from '@/data/models'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanModel } from '../plan'
import { CompanyModelDto } from '@/data/protocols'

export const mockCompanyModel = (companyDto?: CompanyModelDto): CompanyModel => ({
  id: fakeData.entity.id(),
  planId: mockPlanModel().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...companyDto,
})