import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { InviteData } from '@/data/models'
import { DeleteInviteByIdRepository } from '@/data/repositories'

@Injectable('deleteInviteByIdRepository')
export class DbDeleteInviteRepository implements DeleteInviteByIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteInviteById = async (id: InviteData['id']): Promise<InviteData | null> => {
    return await this.db.deleteOne<InviteData, 'id'>({
      collectionName: 'invites',
      matchKey: 'id',
      matchValue: id
    })
  }
}
