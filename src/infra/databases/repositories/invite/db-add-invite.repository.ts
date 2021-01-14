import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateInviteData, InviteData } from '@/data/models'
import { AddInviteRepository } from '@/data/repositories'

@Injectable('addInviteRepository')
export class DbAddInviteRepository implements AddInviteRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  addInvite = async (dto: CreateInviteData): Promise<InviteData> => {
    return await this.db.addOne({
      collectionName: 'invites',
      dto
    })
  }
}
