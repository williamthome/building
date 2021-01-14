// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetInvitesByCompanyIdRepository } from '@/data/repositories'
// < Only Domain
import { GetInvitesByCompanyIdUseCase } from '@/domain/usecases'
import { Invite } from '@/domain/entities'

@Injectable('getInvitesByCompanyIdUseCase')
export class GetInvitesByCompanyIdContract implements GetInvitesByCompanyIdUseCase {
  constructor(
    @Inject() private readonly getInvitesByCompanyIdRepository: GetInvitesByCompanyIdRepository
  ) {}

  call = async (id: Invite['companyId']): Promise<Invite[]> => {
    return await this.getInvitesByCompanyIdRepository.getInvitesByCompanyId(id)
  }
}
