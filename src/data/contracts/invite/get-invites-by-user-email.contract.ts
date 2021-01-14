// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetInvitesByUserEmailRepository } from '@/data/repositories'
// < Only Domain
import { GetInvitesByUserEmailUseCase } from '@/domain/usecases'
import { Invite } from '@/domain/entities'

@Injectable('getInvitesByUserEmailUseCase')
export class GetInvitesByUserEmailContract implements GetInvitesByUserEmailUseCase {
  constructor(
    @Inject() private readonly getInvitesByUserEmailRepository: GetInvitesByUserEmailRepository
  ) {}

  call = async (email: Invite['to']): Promise<Invite[]> => {
    return await this.getInvitesByUserEmailRepository.getInvitesByUserEmail(email)
  }
}
