// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteInviteByIdRepository } from '@/data/repositories'
// < Only Domain
import { Invite } from '@/domain/entities'
import { DeleteInviteUseCase } from '@/domain/usecases'

@Injectable('deleteInviteUseCase')
export class DeleteInviteContract implements DeleteInviteUseCase {
  constructor(@Inject() private readonly deleteInviteByIdRepository: DeleteInviteByIdRepository) {}

  call = async (id: Invite['id']): Promise<Invite | null> => {
    return await this.deleteInviteByIdRepository.deleteInviteById(id)
  }
}
