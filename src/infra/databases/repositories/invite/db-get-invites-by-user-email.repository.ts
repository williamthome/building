import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { InviteData } from '@/data/models'
import { GetInvitesByUserEmailRepository } from '@/data/repositories'

@Injectable('getInvitesByUserEmailRepository')
export class DbGetInvitesByUserEmailRepository implements GetInvitesByUserEmailRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getInvitesByUserEmail = async (email: InviteData['to']): Promise<InviteData[]> => {
    return await this.db.getMany<InviteData, 'to'>({
      collectionName: 'invites',
      matchKey: 'to',
      matchValue: email
    })
  }
}
