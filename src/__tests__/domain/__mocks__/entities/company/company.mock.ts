import { CompanyRole, UserFeatures } from '@/shared/constants'
import fakeData from '@/__tests__/shared/fake-data'
import { Company, CreateCompanyDto, UpdateBuildingDto } from '@/domain/entities'
import { mockPlan } from '../plan'

export const mockCompany = (dto?: CreateCompanyDto | UpdateBuildingDto): Company => ({
  id: fakeData.entity.id(),
  planId: mockPlan().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...dto
})