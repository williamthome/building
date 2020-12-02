import { Inject, Injectable } from '@/shared/dependency-injection'
import { TechnicianModel } from '@/data/models'
import { UpdateTechnicianRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { TechnicianModelDto } from '@/data/protocols'

@Injectable('updateTechnicianRepository')
export class DbUpdateTechnicianRepository implements UpdateTechnicianRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateTechnician = async (
    id: TechnicianModel['id'],
    dto: TechnicianModelDto
  ): Promise<TechnicianModel | null> => {
    return await this.db.updateOne<TechnicianModel>(id, dto, 'technicians')
  }
}