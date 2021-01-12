import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PhaseData, ProjectData } from '@/data/models'
import { DeletePhaseProjectsRepository } from '@/data/repositories'

@Injectable('deletePhaseProjectsRepository')
export class DbDeletePhaseProjectsRepository implements DeletePhaseProjectsRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deletePhaseProjects = async (id: PhaseData['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectData, 'phaseId'>({
      collectionName: 'projects',
      matchKey: 'phaseId',
      matchValue: id
    })
  }
}
