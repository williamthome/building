// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddInviteRepository } from '@/data/repositories'
// < Only Domain
import { Company, CreateInviteDto, Invite, User } from '@/domain/entities'
import { AddInviteUseCase } from '@/domain/usecases'

@Injectable('addInviteUseCase')
export class AddInviteContract implements AddInviteUseCase {
  constructor(@Inject() private readonly addInviteRepository: AddInviteRepository) {}

  call = async (
    dto: CreateInviteDto,
    loggedUserId: User['id'],
    activeCompanyId: Company['id']
  ): Promise<Invite> => {
    return await this.addInviteRepository.addInvite({
      ...dto,
      from: loggedUserId,
      companyId: activeCompanyId
    })
  }
}
